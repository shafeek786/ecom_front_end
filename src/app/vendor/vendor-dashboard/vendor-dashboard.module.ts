import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VendorDashboardComponent } from './vendor-dashboard.component';

@NgModule({
  declarations: [VendorDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: VendorDashboardComponent }]),
  ],
})
export class VendorDashboardModule {}
