import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
})
export class VendorDashboardComponent {
  vendorName: string = 'Vendor Name'; // Replace with actual vendor name from your authentication service

  constructor(private authService: AuthService) {
    // Assuming vendorName is retrieved from AuthService or similar
    const user = this.authService.getUserDetails();
    this.vendorName = user?.name || 'Vendor';
  }

  logout() {
    this.authService.logout();
    // Navigate to login page or handle post-logout actions
  }
}
