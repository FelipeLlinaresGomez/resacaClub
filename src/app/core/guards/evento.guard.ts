import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../servicies/api.service';

@Injectable({
  providedIn: 'root',
})
export class EventoGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const pathLang = route.params['lang'];
    const pathNombreEvento = route.params['nombreEvento'];
    let existeEvento = false;

    try 
    {
        let existeProximoEventoResponse = await firstValueFrom(await this.apiService.existeEventoProximo(pathNombreEvento));
        existeEvento = !existeProximoEventoResponse.error;
    }catch
    {
        console.error("Error obteniendo eventos");
    }

    if (!existeEvento) {
      this.router.navigate(['/', pathLang, "pagina-no-encontrada"]);
    }
    
    return true;
  }
}
