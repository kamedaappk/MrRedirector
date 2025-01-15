import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteUrl } from '../store/urls.action';
import { Router } from '@angular/router';
import { selectAllUrls } from '../store/url.selector';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { exportUrls, importUrls } from '../utils/storage.utils';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  urls$: any; 

  constructor(private store: Store, private router: Router) {
    this.urls$ = this.store.select(selectAllUrls);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  editUrl(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteUrl(id: number) {
    if (confirm('Are you sure you want to delete this URL?')) {
      this.store.dispatch(deleteUrl({ id }));
    }
  }
  exportUrls() {
      exportUrls();
    }
  
    importUrls(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        importUrls(file);
      }
    }
}
