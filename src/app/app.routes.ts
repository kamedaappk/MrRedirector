import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'admin8', component: AdminComponent },
    { path: ':number', component: RedirectComponent },
    { path: '**', redirectTo: '/home' },  // Wildcard route for handling undefined routes
  ];