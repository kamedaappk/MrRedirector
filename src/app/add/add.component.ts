import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Url } from '../store/models';
import { addUrl } from '../store/urls.action';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { selectAllUrls } from '../store/url.selector';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  id!: number|null;
  link!: string;
  autoGenerateId: boolean = false;
  errorMessage!: string;
  urls!:Url[]|null;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.store.select(selectAllUrls).subscribe((urls) => {
      this.urls = urls;
    });
  }

  // Generate a unique ID
  generateUniqueId(urls: Url[]): number {
    const maxId = urls.length > 0 ? Math.max(...urls.map((url) => url.id)) : 0;
    return maxId + 1;
  }

  // Handle checkbox change
  onAutoGenerateChange() {
    if (this.autoGenerateId) {
      this.store.select(selectAllUrls).subscribe((urls) => {
        this.id = this.generateUniqueId(urls);
      });
    } else {
      this.id = null; // Clear the ID if auto-generate is unchecked
    }
  }

  onSubmit() {
    console.log("onSubmit");  
      // Check if the ID is already in use (if manually entered)
      console.log("urls", this.urls);
      if (!this.autoGenerateId && this.urls?.some((url) => url.id == this.id)) {
        this.showError( `ID ${this.id} is already in use. Please choose a different number.`);
        return;
      }
  
      // Validate the URL
      if (!this.isValidUrl(this.link)) {
        this.showError('Please enter a valid URL.');
        return;
      }
  
      // Add the URL
      const url: Url = {
        id: Number(this.id)!,
        link: this.link,
        isPublic: true,
        redirectCount: 0,
      };
      console.log("url01", url);
      this.store.dispatch(addUrl({ url }));
      this.errorMessage = ''; // Clear error message
      this.id = null; // Reset form
      this.link = '';
      this.autoGenerateId = false; // Reset checkbox
      this.router.navigate(['/home']); // Redirect to homepage after saving
  }

  // Validate URL format
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Reset error message after 2 seconds
    }, 3000);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}