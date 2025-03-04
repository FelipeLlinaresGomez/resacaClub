import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../core/servicies/global.service';

@Component({
  selector: 'app-politica-de-cookies',
  standalone: true,
  imports: [],
  templateUrl: './politica-de-cookies.component.html',
  styleUrl: './politica-de-cookies.component.css'
})
export class PoliticaDeCookiesComponent {
  private subscription!: Subscription;

  InformacionCookies!: string;
  InformacionCookiesDescripcion!: string;
  QueSonCookies!: string;
  QueSonCookiesDescripcion!: string;
  CookiesAfectadasNormativa!: string;
  CookiesAfectadasNormativaDescripcion!: string;
  QueSonCookiesDescripcion2!: string;
  TiposCookies!: string;
  SegunFinalidad!: string;
  CookiesTecnicas!: string;
  CookiesAnaliticas!: string;
  CookiesPublicitarias!: string;
  CookiesPublicidadComportamental!: string;
  CookiesSociales!: string;
  CookiesAfiliados!: string;
  CookiesSeguridad!: string;
  CookiesTecnicasDescripcion!: string;
  CookiesAnaliticasDescripcion!: string;
  CookiesPublicitariasDescripcion!: string;
  CookiesPublicidadComportamentalDescripcion!: string;
  CookiesSocialesDescripcion!: string;
  CookiesAfiliadosDescripcion!: string;
  CookiesSeguridadDescripcion!: string;
  SegunPropiedad!: string;
  CookiesPropias!: string;
  CookiesTerceros!: string;
  CookiesPropiasDescripcion!: string;
  CookiesTercerosDescripcion!: string;
  SegunPlazo!: string;
  CookiesSesion!: string;
  CookiesPersistentes!: string;
  CookiesSesionDescripcion!: string;
  CookiesPersistentesDescripcion!: string;

  TratamientoDatos!: string;
  TratamientoDatosDescripcion!: string;
  FinesTratamiento!: string;
  FinesTratamientoDescripcion!: string;
  LegitimacionTratamiento!: string;
  LigitimacionTratamientoDescripcion!: string;
  CriteriosConservacionDatos!: string;
  CriteriosConservacionDatoDescripcion!: string;
  ComunicacionDatos!: string;
  ComunicacionDatosDescripcion!: string;
  DerechosInteresado!: string;
  DerechoRetirarConsentimiento!: string;
  DerechoAcceso!: string;
  DerechoReclamacion!: string;
  DatosContacto!: string;

  CookiesUtilizadas!: string;
  TecnicasFuncionales!: string;
  Nombre!: string;
  Descripcion!: string;
  Duracion!: string;
  Entidad!: string;
  AlmacenaPreferencias!: string;
  UnAnio!: string;
  CookiePropia!: string;

  PanelConfiguracion!: string;
  PanelConfiguracionDescripcion!: string;
  GestionarCookiesTitulo!: string;
  EliminarCookies!: string;
  EliminarCookiesDescripcion!: string;
  GestionarCookies!: string;
  GestionarCookiesDescripcion!: string;
  BloquearCookies!: string;
  BloquearCookiesDescripcion!: string;
  EliminarCookiesNavegador!: string;
  Navegador!: string;
  Enlace!: string;

  constructor(private globalService: GlobalService) {}
  
  ngOnInit(): void {
    //Access the global variable
    this.subscription = this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => 
        { 
          this.InformacionCookies = this.globalService.translate('InformacionCookies');
          this.InformacionCookiesDescripcion = this.globalService.translate('InformacionCookiesDescripcion');
          this.QueSonCookies = this.globalService.translate('QueSonCookies');
          this.QueSonCookiesDescripcion = this.globalService.translate('QueSonCookiesDescripcion');
          this.QueSonCookiesDescripcion2 = this.globalService.translate('QueSonCookiesDescripcion2');
          this.CookiesAfectadasNormativa = this.globalService.translate('CookiesAfectadasNormativa');
          this.CookiesAfectadasNormativaDescripcion = this.globalService.translate('CookiesAfectadasNormativaDescripcion');
          this.TiposCookies = this.globalService.translate('TiposCookies');

          this.SegunFinalidad = this.globalService.translate('SegunFinalidad');
          this.CookiesTecnicas = this.globalService.translate('CookiesTecnicas');
          this.CookiesAnaliticas = this.globalService.translate('CookiesAnaliticas');
          this.CookiesPublicitarias = this.globalService.translate('CookiesPublicitarias');
          this.CookiesPublicidadComportamental = this.globalService.translate('CookiesPublicidadComportamental');
          this.CookiesSociales = this.globalService.translate('CookiesSociales');
          this.CookiesAfiliados = this.globalService.translate('CookiesAfiliados');
          this.CookiesSeguridad = this.globalService.translate('CookiesSeguridad');
          this.CookiesTecnicasDescripcion = this.globalService.translate('CookiesTecnicasDescripcion');
          this.CookiesAnaliticasDescripcion = this.globalService.translate('CookiesAnaliticasDescripcion');
          this.CookiesPublicitariasDescripcion = this.globalService.translate('CookiesPublicitariasDescripcion');
          this.CookiesPublicidadComportamentalDescripcion = this.globalService.translate('CookiesPublicidadComportamentalDescripcion');
          this.CookiesSocialesDescripcion = this.globalService.translate('CookiesSocialesDescripcion');
          this.CookiesAfiliadosDescripcion = this.globalService.translate('CookiesAfiliadosDescripcion');
          this.CookiesSeguridadDescripcion = this.globalService.translate('CookiesSeguridadDescripcion');

          this.SegunPropiedad = this.globalService.translate('SegunPropiedad');
          this.CookiesPropias = this.globalService.translate('CookiesPropias');
          this.CookiesTerceros = this.globalService.translate('CookiesTerceros');
          this.CookiesPropiasDescripcion = this.globalService.translate('CookiesPropiasDescripcion');
          this.CookiesTercerosDescripcion = this.globalService.translate('CookiesTercerosDescripcion');

          this.SegunPlazo = this.globalService.translate('SegunPlazo');
          this.CookiesSesion = this.globalService.translate('CookiesSesion');
          this.CookiesPersistentes = this.globalService.translate('CookiesPersistentes');
          this.CookiesSesionDescripcion = this.globalService.translate('CookiesSesionDescripcion');
          this.CookiesPersistentesDescripcion = this.globalService.translate('CookiesPersistentesDescripcion');

          this.TratamientoDatos = this.globalService.translate('TratamientoDatos');
          this.TratamientoDatosDescripcion = this.globalService.translate('TratamientoDatosDescripcion');
          this.FinesTratamiento = this.globalService.translate('FinesTratamiento');
          this.FinesTratamientoDescripcion = this.globalService.translate('FinesTratamientoDescripcion');
          this.LegitimacionTratamiento = this.globalService.translate('LegitimacionTratamiento');
          this.LigitimacionTratamientoDescripcion = this.globalService.translate('LigitimacionTratamientoDescripcion');
          this.CriteriosConservacionDatos = this.globalService.translate('CriteriosConservacionDatos');
          this.CriteriosConservacionDatoDescripcion = this.globalService.translate('CriteriosConservacionDatoDescripcion');
          this.ComunicacionDatos = this.globalService.translate('ComunicacionDatos');
          this.ComunicacionDatosDescripcion = this.globalService.translate('ComunicacionDatosDescripcion');
          this.DerechosInteresado = this.globalService.translate('DerechosInteresado');
          this.DerechoRetirarConsentimiento = this.globalService.translate('DerechoRetirarConsentimiento');
          this.DerechoAcceso = this.globalService.translate('DerechoAcceso');
          this.DerechoReclamacion = this.globalService.translate('DerechoReclamacion');
          this.DatosContacto = this.globalService.translate('DatosContacto');

          this.CookiesUtilizadas = this.globalService.translate('CookiesUtilizadas');
          this.TecnicasFuncionales = this.globalService.translate('TecnicasFuncionales');
          this.Nombre = this.globalService.translate('Nombre');
          this.Descripcion = this.globalService.translate('Descripcion');
          this.Duracion = this.globalService.translate('Duracion');
          this.Entidad = this.globalService.translate('Entidad');
          this.AlmacenaPreferencias = this.globalService.translate('AlmacenaPreferencias');
          this.UnAnio = this.globalService.translate('UnAnio');
          this.CookiePropia = this.globalService.translate('CookiePropia');

          this.PanelConfiguracion = this.globalService.translate('PanelConfiguracion');
          this.PanelConfiguracionDescripcion = this.globalService.translate('PanelConfiguracionDescripcion');
          this.GestionarCookiesTitulo = this.globalService.translate('GestionarCookiesTitulo');
          this.EliminarCookies = this.globalService.translate('EliminarCookies');
          this.EliminarCookiesDescripcion = this.globalService.translate('EliminarCookiesDescripcion');
          this.GestionarCookies = this.globalService.translate('GestionarCookies');
          this.GestionarCookiesDescripcion = this.globalService.translate('GestionarCookiesDescripcion');
          this.BloquearCookies = this.globalService.translate('BloquearCookies');
          this.BloquearCookiesDescripcion = this.globalService.translate('BloquearCookiesDescripcion');
          this.EliminarCookiesNavegador = this.globalService.translate('EliminarCookiesNavegador');
          this.Navegador = this.globalService.translate('Navegador');
          this.Enlace = this.globalService.translate('Enlace');
        }
    );
  }

  ngAfterViewInit(): void{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
