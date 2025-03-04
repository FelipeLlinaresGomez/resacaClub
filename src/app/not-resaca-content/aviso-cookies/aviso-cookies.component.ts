import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../core/servicies/global.service';

@Component({
  selector: 'app-aviso-cookies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './aviso-cookies.component.html',
  styleUrl: './aviso-cookies.component.css'
})

export class AvisoCookiesComponent implements OnInit {
  cookieConsent: boolean = false;

  protected idiomaSeleccionado!: string;
  private subscription!: Subscription;

  UsamosCookies!: string;
  MasInformacion!: string;
  Aceptar!: string;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.cookieConsent = this.checkCookieConsent();

    //Access the global variable
    this.subscription = this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => {
        this.idiomaSeleccionado = idioma;

        this.UsamosCookies = this.globalService.translate('UsamosCookies');
        this.MasInformacion = this.globalService.translate('MasInformacion');
        this.Aceptar = this.globalService.translate('Aceptar');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkCookieConsent(): boolean {
    return !!localStorage.getItem('cookieConsent');
  }

  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'true');
    this.cookieConsent = true;
    this.globalService.setCookie();
  }
}