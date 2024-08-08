import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  serverError: string | null = null; // To store server-side errors

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      userType: new FormControl('vendor', Validators.required), // Default role
    });
  }

  onSubmit() {
    this.serverError = null; // Reset server error

    this.service.verifyLogin(this.loginForm.value).subscribe(
      (res) => {
        if (res.success) {
          console.log('Login successful');
          console.log('User token: ' + res.access_token);
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('role', res.role);

          const decodedToken = jwtDecode<any>(res.access_token);
          console.log('Decoded Token: ', decodedToken);

          // Check for vendor approval
          if (res.role === 'vendor' && !decodedToken.isApproved) {
            this.serverError = 'Your vendor account is not approved yet.';
            return;
          }

          // Navigate based on role
          if (res.role === 'admin') {
            this.router.navigate(['admin-dashboard']);
          } else if (res.role === 'vendor') {
            this.router.navigate(['vendor-dashboard']);
          }
        } else {
          // Handle specific API errors if provided
          this.serverError = res.message || 'An unexpected error occurred.';
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);

        switch (error.status) {
          case 400:
            this.serverError =
              'Bad Request: ' + (error.error.message || 'Invalid request.');
            break;
          case 401:
            this.serverError =
              'Unauthorized access. Please check your credentials or wait for the approval.';
            break;
          case 403:
            this.serverError =
              'Forbidden: ' +
              (error.error.message || 'You do not have permission.');
            break;
          case 404:
            this.serverError =
              'Not Found: ' +
              (error.error.message || 'Requested resource not found.');
            break;
          case 409:
            this.serverError =
              'Conflict error: ' +
              (error.error.message || 'Conflict occurred.');
            break;
          case 500:
            this.serverError =
              'Server Error: ' +
              (error.error.message || 'An unexpected error occurred.');
            break;
          default:
            this.serverError = 'An unexpected error occurred.';
            break;
        }
      }
    );
  }
}
