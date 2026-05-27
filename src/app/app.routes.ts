import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminItemsComponent } from './features/admin/items/admin-items.component';
import { AddProductComponent } from './features/admin/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/public/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'shop',
        loadComponent: () =>
          import('./features/user/shop/shop.component').then(
            (m) => m.ShopComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/user/cart/cart.component').then(
            (m) => m.CartComponent,
          ),
      },
      {
        path: 'history-buy',
        loadComponent: () =>
          import('./features/user/history-buy/history-buy.component').then(
            (m) => m.HistoryBuyComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'items',
      },
      {
        path: 'items',
        loadComponent: () =>
          import('./features/admin/items/admin-items.component').then(
            (m) => m.AdminItemsComponent,
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/admin/history/admin-history.component').then(
            (m) => m.AdminHistoryComponent,
          ),
      },
	  { path: 'add-product', component: AddProductComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
