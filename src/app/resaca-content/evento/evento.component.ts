import { Component, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Evento } from '../../core/models/evento.model';
import { GlobalService } from '../../core/servicies/global.service';
import { ApiService } from '../../core/servicies/api.service';
import { Reserva } from '../../core/models/reserva.model';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})

export class EventoComponent {
  private subscription!: Subscription;
  protected idiomaSeleccionado!: string;

  exito:WritableSignal<boolean|undefined> = signal(undefined);;
  cargando= signal(false);
  mostrandoCard= signal(false);

  contactForm: FormGroup;

  DescripcionEvento!: string;
  ListaInvitados!: string;
  Nombre!: string;
  Correo!: string;
  Telefono!: string;
  Enviar!: string;
  MasInformacion!: string;
  HacerClick!: string;
  AceptoComunicaciones!: string;

  eventoSeleccionado !: Evento;
  mostrarListaReservas !: boolean;
  mostrarCompraEntradas !: boolean;
  nombreEnlaceTickets !: string;

  map!: google.maps.Map;

  constructor(private globalService: GlobalService, private fb: FormBuilder, private apiService: ApiService, private router: Router, private activateRouter: ActivatedRoute) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      aceptaComunicaciones: [false]
    });
  }

  async apuntarInvitado(event: SubmitEvent) {
    this.mostrandoCard.set(true);
    if (this.contactForm.valid) {
      event.preventDefault();
      this.cargando.set(true);

      try
      {        
        if (this.eventoSeleccionado != null && this.eventoSeleccionado.id != null)
        {
          let form = this.contactForm.getRawValue();
          let reserva = new Reserva(form.nombre, form.email, form.telefono, this.eventoSeleccionado.id, form.aceptaComunicaciones);
  
          let añadirReservaResponse = await firstValueFrom(await this.apiService.añadirReserva(this.eventoSeleccionado.id, reserva));
          this.exito.set(!añadirReservaResponse.error);
        }
        else
        {
          console.error('Evento seleccionado no existe');
          this.exito.set(false);
        }

      }
      catch (error)
      {
        console.error('Error getting on the list:', error);
        this.exito.set(false);
      }

      this.cargando.set(false);
    }
  }

  async ngOnInit(): Promise<void> {
    try{
      let pathNombreEvento = "";
      this.activateRouter.url.subscribe(urlSegments => {
        pathNombreEvento = urlSegments[urlSegments.length - 1].path;
      });

      if (pathNombreEvento == "")
        this.router.navigate(['/', this.globalService.getIdiomaSeleccionado(), "pagina-no-encontrada"]);
  
      let eventos = this.apiService.getEventosLocal();
  
      if (eventos == null || eventos.length == 0){
        eventos = await firstValueFrom(this.apiService.getProximosEventos());
      }
      let evento = eventos.find(e => e.nombreId == pathNombreEvento);

      if (evento != null){
        this.eventoSeleccionado = evento;
        this.mostrarListaReservas = evento.mostrarListaReservas == true;
        this.mostrarCompraEntradas = evento.urlTickets != null && evento.urlTickets != "";
        this.nombreEnlaceTickets = evento.nombreEnlaceTickets != null && evento.nombreEnlaceTickets != "" ? evento.nombreEnlaceTickets : "TICKETS";
      }
      else
        this.router.navigate(['/', this.globalService.getIdiomaSeleccionado(), "pagina-no-encontrada"]);
    }
    catch (error)
    {
      console.error('Error fetching data:', error);
    }

    //Access the global variable
    this.subscription = this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => 
        {
          this.idiomaSeleccionado = idioma;
          this.ListaInvitados = this.globalService.translate('ListaInvitados');
          this.DescripcionEvento = idioma == "en" ? (this.eventoSeleccionado.descripcion_en ?? this.eventoSeleccionado.descripcion): this.eventoSeleccionado.descripcion;
          this.Nombre = this.globalService.translate('Nombre');
          this.Correo = this.globalService.translate('Correo');
          this.Telefono = this.globalService.translate('Telefono');
          this.Enviar = this.globalService.translate('Apuntar');
          this.MasInformacion = this.globalService.translate('MasInformacion');
          this.HacerClick = this.globalService.translate('HacerClick');
          this.AceptoComunicaciones = this.globalService.translate('AceptoComunicaciones');
        }
    );

    this.initMap();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeOverlay() {
      this.contactForm.reset();
      this.mostrandoCard.set(false);
  }

  irAdelante() {
    window.location.href = this.eventoSeleccionado.urlTickets ?? "";
  }

  // Function to initialize the map
  private initMap(): void {
    if (this.eventoSeleccionado.lat != null && this.eventoSeleccionado.lon != null){
      const mapElement = document.getElementById('map') as HTMLElement;

      // Set the map center and zoom
      const mapOptions: google.maps.MapOptions = {
        center: { lat: this.eventoSeleccionado.lat, lng: this.eventoSeleccionado.lon },
        zoom: 15,
        mapId: '102c15da48b9a4d7'
      };
  
      // Create a new map instance
      this.map = new google.maps.Map(mapElement, mapOptions);
  
      // Create an AdvancedMarkerElement
      const markerOptions = {
        position: { lat: this.eventoSeleccionado.lat, lng: this.eventoSeleccionado.lon },
        map: this.map,
        title: this.eventoSeleccionado.nombre,
      };
  
      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        position: markerOptions.position,
        map: this.map,
        title: markerOptions.title,
      });
    }

  }
}