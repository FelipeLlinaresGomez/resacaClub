import { Routes } from '@angular/router';
import { LanguageGuard } from './core/guards/language.guard';
import { EventoGuard } from './core/guards/evento.guard';
import { PoliticaDeCookiesComponent } from './not-resaca-content/politica-de-cookies/politica-de-cookies.component';
import { PoliticaDePrivacidadComponent } from './not-resaca-content/politica-de-privacidad/politica-de-privacidad.component';
import { PaginaNoEncontradaComponent } from './not-resaca-content/pagina-no-encontrada/pagina-no-encontrada.component';
import { RedirectCookieGuard } from './core/guards/redirectcookieguard.guard';
import { HomeComponent } from './resaca-content/home/home.component';
import { ContactoComponent } from './resaca-content/contacto/contacto.component';
import { EventoComponent } from './resaca-content/evento/evento.component';

export const routes: Routes = [
    {
        path: ':lang',
        canActivate: [LanguageGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'contacto', component: ContactoComponent},
            { path: 'eventos/:nombreEvento', component: EventoComponent, canActivate: [EventoGuard] },
            { path: 'politica-de-cookies', component: PoliticaDeCookiesComponent},
            { path: 'politica-de-privacidad', component: PoliticaDePrivacidadComponent},
            { path: ':pathMatch**', redirectTo: 'pagina-no-encontrada', pathMatch: 'full' },
            { path: 'pagina-no-encontrada', component: PaginaNoEncontradaComponent }
            // { 
            //     path: '', 
            //     loadChildren: () => import('eventos/eventos.routes').then(m => m.EVENTO_ROUTES)
            // }

        ],
    },
    { path: '', component: HomeComponent, canActivate: [RedirectCookieGuard] },
    { path: 'defaultsite', redirectTo: 'es', pathMatch: 'full' }, 
    { path: '**', redirectTo: 'es/pagina-no-encontrada', pathMatch: 'full' }
];

// { path: 'es', component: HomeComponent },
// { path: 'es/contact', redirectTo: 'es/contacto', pathMatch: 'full' },
// { path: 'es/contacto', component: ContactoComponent},
// { path: 'es/cookies-terms', redirectTo: 'es/politica-de-cookies', pathMatch: 'full' },
// { path: 'es/politica-de-cookies', component: PoliticaDeCookiesComponent},
// { path: 'es/:pathMatch**', redirectTo: 'es/pagina-no-encontrada', pathMatch: 'full' },
// { path: 'es/page-not-found', redirectTo: 'es/pagina-no-encontrada', pathMatch: 'full' },
// { path: 'es/pagina-no-encontrada', component: PaginaNoEncontradaComponent }, 

// { path: 'en', component: HomeComponent },
// { path: 'en/contacto', redirectTo: 'en/contact', pathMatch: 'full' },
// { path: 'en/contact', component: ContactoComponent},
// { path: 'en/politica-de-cookies', redirectTo: 'en/cookies-terms', pathMatch: 'full' },
// { path: 'en/cookies-terms', component: PoliticaDeCookiesComponent},
// { path: 'en/:pathMatch**', redirectTo: 'en/page-not-found', pathMatch: 'full' },
// { path: 'en/pagina-no-encontrada', redirectTo: 'en/page-not-found', pathMatch: 'full' },
// { path: 'en/page-not-found', component: PaginaNoEncontradaComponent },

// { path: '**', redirectTo: 'es/pagina-no-encontrada', pathMatch: 'full' },