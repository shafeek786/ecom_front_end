import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = Environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  getVendors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/vendors`);
  }

  approveVendor(vendorId: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/admin/vendors/${vendorId}/approve`,
      {}
    );
  }

  rejectVendor(vendorId: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/admin/vendors/${vendorId}/reject`,
      {}
    );
  }
}
