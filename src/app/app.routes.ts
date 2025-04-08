import { Routes } from '@angular/router';
import { PackageListComponent } from './components/package-list/package-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/csomagok', pathMatch: 'full' },
  { path: 'csomagok', component: PackageListComponent },
  { path: 'rendeles', component: OrderFormComponent },
  { path: '**', redirectTo: '/csomagok' }
];
