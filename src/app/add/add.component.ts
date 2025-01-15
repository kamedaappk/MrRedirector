import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Url } from '../store/models';
import { addUrl } from '../store/urls.action';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { selectAllUrls } from '../store/url.selector';

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

  constructor(private store: Store) {}

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
    this.store.select(selectAllUrls).subscribe((urls) => {
      // Check if the ID is already in use (if manually entered)
      if (!this.autoGenerateId && urls.some((url) => url.id === this.id)) {
        this.errorMessage = `ID ${this.id} is already in use. Please choose a different number.`;
        return;
      }
  
      // Validate the URL
      if (!this.isValidUrl(this.link)) {
        this.errorMessage = 'Please enter a valid URL.';
        return;
      }
  
      // Add the URL
      const url: Url = {
        id: this.id!,
        link: this.link,
        isPublic: true,
        redirectCount: 0,
      };
      this.store.dispatch(addUrl({ url }));
      this.errorMessage = ''; // Clear error message
      this.id = null; // Reset form
      this.link = '';
      this.autoGenerateId = false; // Reset checkbox
    });
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
}