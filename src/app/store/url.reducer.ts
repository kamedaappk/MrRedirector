// src/app/store/url.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Url } from './models';
import { loadUrlsFromStorage, saveUrlsToStorage } from '../utils/storage.utils';
import { addUrl, editUrl, incrementRedirectCount } from './urls.action';


export interface UrlState {
  urls: Url[];
}

export const initialState: UrlState = {
  urls: loadUrlsFromStorage(), // Initialize state from localStorage
};

export const urlReducer = createReducer(
  initialState,
  on(addUrl, (state, { url }) => {
    const newState = { ...state, urls: [...state.urls, url] };
    saveUrlsToStorage(newState.urls); // Save to localStorage
    return newState;
  }),
  on(editUrl, (state, { url }) => {
    const newState = {
      ...state,
      urls: state.urls.map((u) => (u.id === url.id ? url : u)),
    };
    saveUrlsToStorage(newState.urls); // Save to localStorage
    return newState;
  }),
  on(incrementRedirectCount, (state, { id }) => {
    const newState = {
      ...state,
      urls: state.urls.map((u) =>
        u.id === id ? { ...u, redirectCount: u.redirectCount + 1 } : u
      ),
    };
    saveUrlsToStorage(newState.urls); // Save to localStorage
    return newState;
  })
);