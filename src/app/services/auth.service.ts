import { Injectable } from '@angular/core';
import { Environment } from '../environment/environment';
import {
  loginData,
  loginResponse,
  userInterface,
} from '../interface/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = Environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  isLogin() {
    return localStorage.getItem('token') != null;
  }

  getUserRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return '';
  }

  getUserDetails(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  verifyLogin(data: loginData): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.apiUrl + '/auth/login', data);
  }

  signUp(data: userInterface) {
    return this.http.post(this.apiUrl + '/auth/signup', data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
