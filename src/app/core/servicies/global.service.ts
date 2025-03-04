import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private idiomaSeleccionadoSubject = new BehaviorSubject<string>('');
  idiomaSeleccionado = this.idiomaSeleccionadoSubject.asObservable();
  private translations: { [key: string]: string } = {};

  constructor(private router: Router, private cookieService: CookieService) {}

  async setIdiomaSeleccionado(idioma: string): Promise<void> {
    await this.loadTranslations(idioma);

    if (idioma != "es" && idioma != "en")
      idioma = "es";
    
    this.idiomaSeleccionadoSubject.next(idioma);
    var cookieConsent = this.checkCookieConsent();
  
    if (cookieConsent)
      this.cookieService.set('*_preferred_lang', idioma, 365); // Cookie expires in 365 days

    const newUrl = this.router.url.replace(/^\/[a-z]{2}/, `/${idioma}`);
    if (newUrl != this.router.url)
      this.router.navigate([newUrl]);
  }

  setCookie(): void {
    var cookieConsent = this.checkCookieConsent();
    if (cookieConsent)
      this.cookieService.set('*_preferred_lang', this.getIdiomaSeleccionado(), 365); // Cookie expires in 365 days
  }

  checkCookieConsent(): boolean {
    return !!localStorage.getItem('cookieConsent');
  }

  getIdiomaSeleccionado() {
    return this.idiomaSeleccionadoSubject.value;
  }


  getURl() {
    return this.router.url;
  }

  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async loadTranslations(idioma: string): Promise<void> {
    const url = `assets/i18n/${idioma}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Ensure the data conforms to the expected type
      if (typeof data === 'object' && data !== null) {
        this.translations = data as { [key: string]: string };
      } else {
        console.error('Invalid JSON structure');
        this.translations = {};
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.translations = {}; // Default to empty object on error
    }
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
