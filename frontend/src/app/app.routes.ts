import { Routes } from '@angular/router';
import { AdminShell } from './layout/admin-shell';

export const routes: Routes = [
  {
    path: '',
    component: AdminShell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPage)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/product-list/product-list').then((m) => m.ProductList)
      },
      {
        path: 'products/new',
        loadComponent: () => import('./features/products/product-form/product-form').then((m) => m.ProductFormPage)
      },
      {
        path: 'products/:id/edit',
        loadComponent: () => import('./features/products/product-form/product-form').then((m) => m.ProductFormPage)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/orders/order-management-page').then((m) => m.OrderManagementPage)
      },
      {
        path: 'customers',
        loadComponent: () => import('./features/customers/customer-list-page').then((m) => m.CustomerListPage)
      },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];
