import {Routes} from '@angular/router';
import {Home} from './pages/home/home.component';
import {Portfolio} from './pages/portfolio/portfolio.component';
import {Contacts} from './pages/contacts/contacts.component';
import {Dublis} from './pages/projects/dublis/dublis.component';
import {AidaiComponent} from './pages/projects/aidai/aidai.component';
import {VaisiaiComponent} from './pages/projects/vaisiai/vaisiai.component';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'portfolio', component: Portfolio},
  {path: 'contacts', component: Contacts},
  {path: 'dublis', component: Dublis},
  {path: 'aidai', component: AidaiComponent},
  {path: 'vaisiai', component: VaisiaiComponent},
];
