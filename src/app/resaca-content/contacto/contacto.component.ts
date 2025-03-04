import { Component, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contacto } from '../../core/models/contacto.model';
import { GlobalService } from '../../core/servicies/global.service';
import { ApiService } from '../../core/servicies/api.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})

export class ContactoComponent {
  private subscription!: Subscription;
  protected idiomaSeleccionado!: string;

  exito:WritableSignal<boolean|undefined> = signal(undefined);;
  cargando= signal(false);
  mostrandoCard= signal(false);

  contactForm: FormGroup;

  ContactaNosotros!: string;
  Nombre!: string;
  Correo!: string;
  Mensaje!: string;
  Asunto!: string;
  Enviar!: string;
  MasInformacion!: string;
  HacerClick!: string;
  AceptoComunicaciones!: string;

  constructor(private globalService: GlobalService, private fb: FormBuilder, private apiService: ApiService) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      aceptaComunicaciones: [false]
    });
  }

  async enviarMensaje(event: SubmitEvent) {
    this.mostrandoCard.set(true);
    if (this.contactForm.valid) {
      event.preventDefault();
      this.cargando.set(true);

      try
      {
        let form = this.contactForm.getRawValue();
        let contacto = new Contacto(form.nombre, form.email, form.asunto, form.mensaje, form.aceptaComunicaciones);
        let contactoResponse = await firstValueFrom(await this.apiService.enviarCorreoContacto(contacto));

        this.exito.set(!contactoResponse.error);
      }
      catch (error)
      {
        console.error('Error fetching data:', error);
        this.exito.set(false);
      }

      this.cargando.set(false);
    }
  }

  closeOverlay() {
    this.contactForm.reset();
    this.mostrandoCard.set(false);
}

  ngOnInit(): void {
    //Access the global variable
    this.subscription =this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => 
        {
          this.idiomaSeleccionado = idioma;
          this.ContactaNosotros = this.globalService.translate('ContactaNosotros');
          this.Nombre = this.globalService.translate('Nombre');
          this.Correo = this.globalService.translate('Correo');
          this.Asunto = this.globalService.translate('Asunto');
          this.Mensaje = this.globalService.translate('Mensaje');
          this.Enviar = this.globalService.translate('Enviar');
          this.MasInformacion = this.globalService.translate('MasInformacion');
          this.AceptoComunicaciones = this.globalService.translate('AceptoComunicaciones');
          this.HacerClick = this.globalService.translate('HacerClickContacto');
        }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
