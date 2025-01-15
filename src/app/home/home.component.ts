import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPublicUrls } from '../store/url.selector';
import { CommonModule } from '@angular/common';
import { exportUrls, importUrls } from '../utils/storage.utils';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  urls$: any;

  constructor(private store: Store) {
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
}