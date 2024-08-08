import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

interface Id {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUrl!: string;

  constructor(
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.currentUrl = this.router.url;
    const token = localStorage.getItem('token');
    if (!token) {
      return this.router.parseUrl('/login');
    }

    const decodedToken: Id = jwtDecode(token);
    const userRole = this.service.getUserRole();

    if (this.service.isLogin()) {
      if (userRole === 'vendor') {
        return true;
      } else {
        this.toastr.warning(
          'You do not have access. Please login with the correct role.'
        );
        this.service.logout();
        return this.router.parseUrl('/login');
      }
    }

    return this.router.parseUrl('/login');
  }
}
