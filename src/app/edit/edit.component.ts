import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Url } from '../store/models';
import { selectUrlById } from '../store/url.selector';
import { editUrl } from '../store/urls.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  url!: Url;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectUrlById(id)).subscribe((url) => {
      if (url) {
        this.url = { ...url }; // Create a copy of the URL object
      } else {
        this.router.navigate(['/home']); // Redirect if URL not found
      }
    });
  }

  onSubmit() {
    if (!this.isValidUrl(this.url.link)) {
      this.showError('Please enter a valid URL.');
      return;
    }

    this.store.dispatch(editUrl({ url: this.url }));
    this.router.navigate(['/home']); // Redirect to homepage after saving
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Reset error message after 2 seconds
    }, 2000);
  }
}