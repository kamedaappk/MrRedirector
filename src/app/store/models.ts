// src/app/models/url.model.ts
export interface Url {
    id: number; // Unique identifier (number)
    link: string; // The URL to redirect to
    isPublic: boolean; // Public or private
    redirectCount: number; // Number of times the URL has been redirected
  }