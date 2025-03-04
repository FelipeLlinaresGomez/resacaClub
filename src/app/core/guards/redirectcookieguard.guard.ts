import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RedirectCookieGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let cookie = this.cookieService.get('*_preferred_lang');

    if (!cookie || cookie.trim().length === 0 || (cookie != "es" && cookie != "en"))
        cookie = "es";

    this.router.navigate(['/', cookie]);

    return false;
  }
}