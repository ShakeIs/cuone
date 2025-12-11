import { Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
import { Portfolio } from './pages/portfolio/portfolio.component';
import { Contacts } from './pages/contacts/contacts.component';
import { Dublis } from './pages/dublis/dublis.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'portfolio', component: Portfolio },
    { path: 'contacts', component: Contacts },
    { path: 'dublis', component: Dublis },
];
