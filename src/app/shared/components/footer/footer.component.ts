import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { GlobalService } from '../../../core/servicies/global.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;
  protected lenguajeSeleccionado!: string;
  protected idiomaSeleccionado!: string;
  private subscription!: Subscription;

  InformacionContacto!: string;
  Escribenos!: string;
  SobreWeb!: string;
  PoliticaCookies!: string;
  Idiomas!: string;
  SobreNosotros!: string;
  SobreNosotrosDescripcion!: string;
  PoliticaPrivacidad!: string;

  constructor(private globalService: GlobalService) {}

  // Method to handle language selection
  selectLanguage(language: string): void {
    if (language == "en" || language == "es")
      this.globalService.setIdiomaSeleccionado(language);
  }

  ngOnInit(): void {
    //Access the global variable
    this.subscription = this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => {
        this.idiomaSeleccionado = idioma;
        
        if (idioma == "en"){
          this.lenguajeSeleccionado = "English";
        }
        else{
          this.lenguajeSeleccionado = "Español";
        }

        this.InformacionContacto = this.globalService.translate('InformacionContacto');
        this.Escribenos = this.globalService.translate('Escribenos');
        this.SobreWeb = this.globalService.translate('SobreWeb');
        this.PoliticaCookies = this.globalService.translate('PoliticaCookies');
        this.PoliticaPrivacidad = this.globalService.translate('PoliticaPrivacidad');
        this.Idiomas = this.globalService.translate('Idiomas');
        this.SobreNosotros = this.globalService.translate('SobreNosotros');
        this.SobreNosotrosDescripcion = this.globalService.translate('SobreNosotrosDescripcion');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async scrollTop() {
    await this.delay(200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}