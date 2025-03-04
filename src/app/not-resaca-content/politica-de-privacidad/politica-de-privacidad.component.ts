import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../core/servicies/global.service';

@Component({
  selector: 'app-politica-de-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-de-privacidad.component.html',
  styleUrl: './politica-de-privacidad.component.css'
})
export class PoliticaDePrivacidadComponent {
  private subscription!: Subscription;

  PoliticaPrivacidad!: string;

  InformacionUsuario!: string;
  ResponsableDatos!: string;
  ResponsableDatosDescripcion!: string;
  PorqueDatos!: string;
  PorqueDatosDescripcion!: string;
  RemisionComunicaciones!: string;
  RealizarEstudios!: string;
  TramitarEncargos!: string;
  RemitirBoletin!: string;
  MotivoDatos!: string;
  MotivoDatosDescripcion!: string;
  TiempoDatos!: string;
  TiempoDatosDescripcion!: string;
  QuienDatos!: string;
  QuienDatosDescripcion!: string;
  DerechosDatos!: string;
  DerechosDatosDescripcion!: string;
  DerechoRetirarConsentimiento!: string;
  DerechoAcceso!: string;
  DerechoReclamacion!: string;
  DatosContacto!: string;

  CaracterInformacion!: string;
  CaracterInformacionDescripcion!: string;
  MedidasSeguridad!: string;
  MedidasSeguridadDescripcion!: string;

  constructor(private globalService: GlobalService) {}
  
  ngOnInit(): void {
    //Access the global variable
    this.subscription = this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => 
        { 
          this.PoliticaPrivacidad = this.globalService.translate('PoliticaPrivacidad');
          this.InformacionUsuario = this.globalService.translate('InformacionUsuario');
          this.ResponsableDatos = this.globalService.translate('ResponsableDatos');
          this.ResponsableDatosDescripcion = this.globalService.translate('ResponsableDatosDescripcion');
          this.PorqueDatos = this.globalService.translate('PorqueDatos');
          this.PorqueDatosDescripcion = this.globalService.translate('PorqueDatosDescripcion');
          this.RemisionComunicaciones = this.globalService.translate('RemisionComunicaciones');
          this.RealizarEstudios = this.globalService.translate('RealizarEstudios');
          this.TramitarEncargos = this.globalService.translate('TramitarEncargos');
          this.RemitirBoletin = this.globalService.translate('RemitirBoletin');

          this.MotivoDatos = this.globalService.translate('MotivoDatos');
          this.MotivoDatosDescripcion = this.globalService.translate('MotivoDatosDescripcion');
          this.TiempoDatos = this.globalService.translate('TiempoDatos');
          this.TiempoDatosDescripcion = this.globalService.translate('TiempoDatosDescripcion');
          this.QuienDatos = this.globalService.translate('QuienDatos');
          this.QuienDatosDescripcion = this.globalService.translate('QuienDatosDescripcion');
          this.DerechosDatos = this.globalService.translate('DerechosDatos');
          this.DerechosDatosDescripcion = this.globalService.translate('DerechosDatosDescripcion');
          this.DerechoRetirarConsentimiento = this.globalService.translate('DerechoRetirarConsentimiento');
          this.DerechoAcceso = this.globalService.translate('DerechoAcceso');
          this.DerechoReclamacion = this.globalService.translate('DerechoReclamacion');
          this.DatosContacto = this.globalService.translate('DatosContacto');

          this.CaracterInformacion = this.globalService.translate('CaracterInformacion');
          this.CaracterInformacionDescripcion = this.globalService.translate('CaracterInformacionDescripcion');
          this.MedidasSeguridad = this.globalService.translate('MedidasSeguridad');
          this.MedidasSeguridadDescripcion = this.globalService.translate('MedidasSeguridadDescripcion');
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
