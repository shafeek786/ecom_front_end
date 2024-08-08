import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/interface/interfaces';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vendors: Vendor[] = [];
  isLoading: boolean = true;

  constructor(private router: Router, private service: AdminService) {}

  ngOnInit(): void {
    this.service.getVendors().subscribe(
      (response: any) => {
        // Ensure response.vendors is an array of Vendor objects
        this.vendors = response.vendors || [];
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching vendors', error);
        this.isLoading = false;
      }
    );
  }

  logout(): void {
    // Add your logout logic here
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }

  approveVendor(vendorId: string): void {
    this.service.approveVendor(vendorId).subscribe(
      (response: any) => {
        console.log('Vendor approved', response);
        // Refresh the vendor list after approval
        this.ngOnInit();
      },
      (error: any) => {
        console.error('Error approving vendor', error);
      }
    );
  }

  rejectVendor(vendorId: string): void {
    this.service.rejectVendor(vendorId).subscribe(
      (response: any) => {
        console.log('Vendor rejected', response);
        // Refresh the vendor list after rejection
        this.ngOnInit();
      },
      (error: any) => {
        console.error('Error rejecting vendor', error);
      }
    );
  }
}
