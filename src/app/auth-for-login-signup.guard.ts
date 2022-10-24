import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthForLoginSignupGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthServiceService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservice.isLoggedIn) {
      this.router.navigateByUrl('/home')
      return true
    } 
    this.router.navigateByUrl('/login')
    return false
  }
  
}
