import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AvisoCookiesComponent } from './not-resaca-content/aviso-cookies/aviso-cookies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent, AvisoCookiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CookieService]
})
export class AppComponent {
  public title = 'pruebaAngular';
}
