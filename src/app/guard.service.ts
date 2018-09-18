import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  // on injecte par dépendance le service AuthService
  constructor(private aS: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.aS.isAuth)
      return true;

    this.router.navigate(['/login'], { queryParams: { messageError: `Error` } });

    return false;

  }

  // méthode pour se déloguer
  logout(): void {
    this.aS.isAuth = ''; // on remet la chaîne de caractères vide

    this.router.navigate(['/albums'], { queryParams: { message: `Success logout` } });
  }

  isLoggedIn() { return this.aS.isAuth.length > 0; }

}