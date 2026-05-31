import { Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
import { Contacts } from './pages/contacts/contacts.component';
export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then(module => module.Portfolio),
  },
  { path: 'contacts', component: Contacts }
];
