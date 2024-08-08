import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardModule } from './admin/admin-dashboard/admin-dashboard.module';
import { VendorDashboardModule } from './vendor/vendor-dashboard/vendor-dashboard.module';
import { LoginModule } from './auth/login/login.module';
import { AddProductComponent } from './vendor/add-product/add-product.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupModule } from './vendor/signup/signup.module';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { InterceptorService } from './services/token-interceptor.interceptor';

@NgModule({
  declarations: [AppComponent, ProductComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AdminDashboardModule,
    VendorDashboardModule,
    LoginModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    SignupModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
