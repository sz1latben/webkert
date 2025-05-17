import { Routes } from '@angular/router';
import { PackageListComponent } from './components/package-list/package-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/csomagok', pathMatch: 'full' },
  { path: 'csomagok', component: PackageListComponent },
  { path: 'rendeles', component: OrderFormComponent },
  {
    path: 'regisztracio',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'bejelentkezes',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  { path: '**', redirectTo: '/csomagok' }
];
