import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPublicUrls } from '../store/url.selector';
import { CommonModule } from '@angular/common';
import { exportUrls, importUrls } from '../utils/storage.utils';
import { deleteUrl } from '../store/urls.action';
import { Router } from '@angular/router';
import QRCode from 'qrcode';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('qrCanvas') qrCanvas: ElementRef<HTMLCanvasElement> | undefined;

  urls$: any;
  errorMessage!: string; // For success messages
  infoMessage!: string; // For error messages
  showQRPopup: boolean = false;
  currentLink!: string;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.urls$ = this.store.select(selectPublicUrls);
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

  deleteUrl(id: number) {
    if (confirm('Are you sure you want to delete this URL?')) {
      this.store.dispatch(deleteUrl({ id }));
    }
  }

  editUrl(id: number) {
    this.router.navigate(['/edit', id]);
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  copyLink(id: number) {
    const baseUrl = window.location.origin; // Get the app's base URL
    const fullLink = `${baseUrl}/${id}`; // Construct the full redirect link
    navigator.clipboard.writeText(fullLink).then(() => {
      this.showInfo('Link copied to clipboard!'); // Notify the user
    }).catch(() => {
      this.showError('Failed to copy link. Please try again.'); // Handle errors
    });
  }
  showInfo(message: string) {
    this.infoMessage = message;
    setTimeout(() => {
      this.infoMessage = ''; // Reset info message after 2 seconds
    }, 2000);
  }

  showError(message: string) {
    console.error(message); // Log the error message to the console
    this.errorMessage = message; // Reuse the same variable for simplicity
    setTimeout(() => {
      this.errorMessage = ''; // Reset error message after 2 seconds
    }, 2000);
  }

  showQRCode(id: number) {
    console.log('showQRCode');
    const baseUrl = window.location.origin;
    this.currentLink = `${baseUrl}/${id}`;
    this.showQRPopup = true;

    // Generate QR code
    setTimeout(() => {
      QRCode.toCanvas(this.qrCanvas?.nativeElement, this.currentLink, (error) => {
        if (error) {
          this.showError('Failed to generate QR code. Please try again.');
          this.closeQRPopup();
        }
      });
    }, 0);
  }

  closeQRPopup() {
    this.showQRPopup = false;
    this.currentLink = '';
  }
}