import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop-layout/shop-layout')
      .then(m => m.ShopLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/shop/product-list/product-list')
          .then(m => m.ProductList)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./features/shop/product-detail/product-detail')
          .then(m => m.ProductDetail)
      },
      {
        path: 'about',
        loadComponent: () => import('./features/shop/about/about')
          .then(m => m.About)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-layout/admin-layout')
      .then(m => m.AdminLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () => import('./features/admin/login/login')
          .then(m => m.Login)
      },
      {
        path: 'dashboard',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/admin/dashboard/dashboard')
          .then(m => m.Dashboard)
      },
      {
        path: 'products',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/admin/product-management/product-management')
          .then(m => m.ProductManagement)
      },
      {
        path: 'password',
        canActivate: [adminGuard],
        loadComponent: () => import('./features/admin/password/password')
          .then(m => m.Password)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'shop'
  }
];
