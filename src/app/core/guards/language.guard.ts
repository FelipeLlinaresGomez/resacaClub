import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GlobalService } from '../servicies/global.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  constructor(private router: Router, private globalService: GlobalService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const pathLang = route.params['lang'];
    
    if (pathLang != "es" && pathLang != "en"){
      this.router.navigate(['/']);
      return false;
    }
    
    if (this.globalService.getIdiomaSeleccionado() != pathLang){
      this.globalService.setIdiomaSeleccionado(pathLang);
    }

    return true;
  }
}