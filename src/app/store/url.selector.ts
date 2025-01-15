// src/app/store/url.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UrlState } from './url.reducer';

export const selectUrlState = createFeatureSelector<UrlState>('urls');

export const selectAllUrls = createSelector(
  selectUrlState,
  (state) => state.urls
);

export const selectPublicUrls = createSelector(
  selectAllUrls,
  (urls) => urls.filter((url) => url.isPublic)
);

export const selectUrlById = (id: number) =>
  createSelector(selectAllUrls, (urls) => urls.find((url) => url.id === id));