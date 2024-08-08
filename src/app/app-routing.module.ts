import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AdminAuthGuard } from './gaurds/adminAuth.guard';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'vendor-dashboard',
    loadChildren: () =>
      import('./vendor/vendor-dashboard/vendor-dashboard.module').then(
        (m) => m.VendorDashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',

    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./vendor/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('./vendor/add-product/add-product.module').then(
        (m) => m.AddProductModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'product-list',
    loadChildren: () =>
      import('./product/product-list.module').then((m) => m.ProductListModule),
  },
  { path: '', component: ProductComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
