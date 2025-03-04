import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../../core/servicies/global.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  @ViewChild('navbarNav') navbarNav!: ElementRef;

  protected paisSeleccionado!: string;
  protected idiomaSeleccionado!: string;
  private subscription!: Subscription;

  Galeria!: string;
  Tienda!: string;
  Contacto!: string;
  Eventos!: string;

  constructor(private router: Router, private globalService: GlobalService) {}

  // Method to handle language selection
  selectLanguage(language: string): void {
    if (language == "en" || language == "es")
      this.globalService.setIdiomaSeleccionado(language);

    this.collapseNavbar();
  }

  ngOnInit(): void {
    //Access the global variable
    this.subscription = this.globalService.idiomaSeleccionado.subscribe(
      (idioma) => {
        this.idiomaSeleccionado = idioma;
        
        if (idioma == "en"){
          this.paisSeleccionado = "ingles";
        }
        else{
          this.paisSeleccionado = "spain";
        }

        this.Galeria = this.globalService.translate('Galeria');
        this.Tienda = this.globalService.translate('Tienda');
        this.Contacto = this.globalService.translate('Contacto');
        this.Eventos = this.globalService.translate('Eventos');
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Adjust this value to the height of your navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      this.collapseNavbar();
    }
    else
    {
      let route = "/"
      route += this.idiomaSeleccionado;
      this.router.navigate([route]).then(async () => {
        // Once navigation is done, scroll to the section
        await this.delay(200);
        this.scrollToSection(sectionId);
      });
    }
  }

  collapseNavbar(): void {
    const navbar = this.navbarNav.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');  
    }
  }

  async collapseNavbarScrollTop(){
    this.collapseNavbar();
    await this.delay(200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
