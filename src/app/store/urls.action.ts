// src/app/store/url.actions.ts
import { createAction, props } from '@ngrx/store';
import { Url } from './models';

export const addUrl = createAction('[URL] Add URL', props<{ url: Url }>());
export const editUrl = createAction('[URL] Edit URL', props<{ url: Url }>());
export const incrementRedirectCount = createAction('[URL] Increment Redirect Count', props<{ id: number }>());
export const deleteUrl = createAction('[URL] Delete URL', props<{ id: number }>()); // New action