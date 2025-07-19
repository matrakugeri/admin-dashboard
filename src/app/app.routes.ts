import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: '',
    redirectTo: 'admin-dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'admin-dashboard',
  },
];
