import { Component, ElementRef, Renderer2, signal, ViewChild } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { firstValueFrom, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from "@vercel/analytics"
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { CardEventoComponent } from '../card-evento/card-evento.component';
import { fadeInOut } from '../../shared/animations';
import { GlobalService } from '../../core/servicies/global.service';
import { ApiService } from '../../core/servicies/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardEventoComponent, CommonModule, ImageGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations:[fadeInOut]
})

export class HomeComponent {
    private subscription!: Subscription;
    protected idiomaSeleccionado!: string;
    
    pageTitle!: string;
    proximosEventos!: string;
    Galeria!: string;
    Tienda!: string;
    videoSource!: string;

    images: string[] = [];
    cards: {nombreId: string, title: string; description: string; image: string; mostrarListaReservas:boolean;}[] = [];

    currentPage = 1;
    public rotatingImages: { [key: number]: boolean } = {};
    imagesTienda: {id: number, current_image: string, front_image: string; back_image: string;}[] = [];

    cargandoEventos= signal(false);
    cargandoImagenes= signal(false);

    errorEventos= signal(false);
    errorImagenes= signal(false);

    constructor(private globalService: GlobalService, private apiService: ApiService, private router: Router) {}

    async ngOnInit(): Promise<void> {

      try{
        injectSpeedInsights();
        inject();
      }catch{}

      this.cargandoEventos.set(true);
      this.cargandoImagenes.set(true);

      this.videoSource = "resacaclub";
      //if (!this.checkIfMobile())
        //this.videoSource += "_web";

      //Access the global variable
      this.subscription = this.globalService.idiomaSeleccionado.subscribe(
        (idioma) => 
          { 
            this.idiomaSeleccionado = idioma;
            this.pageTitle = this.globalService.translate('Titulo');
            this.proximosEventos = this.globalService.translate('ProximosEventos');
            this.Galeria = this.globalService.translate('Galeria');
            this.Tienda = this.globalService.translate('Tienda');
          }
      );

      await Promise.all([this.getProximosEventos(), this.getImagenes()]);
    }

    async getProximosEventos(): Promise<void> {
      try{
        let eventosResponse = await firstValueFrom(this.apiService.getProximosEventos());
        this.apiService.setEventosLocal(eventosResponse);
  
        eventosResponse.forEach(evento => {
          let card =  {nombreId: evento.nombreId, title: evento.nombre, description: evento.descripcion, image: evento.imagen, mostrarListaReservas: evento.mostrarListaReservas == true}
          this.cards.push(card);
        });
      }
      catch
      {
        this.errorEventos.set(true);
      }

      this.cargandoEventos.set(false);
    }

    async getImagenes(): Promise<void> {
      try{
        let imageslocal: string[] = [];
        let imagesResponse = await firstValueFrom(this.apiService.getImages());
        imagesResponse.forEach(image => {
          imageslocal.push(image.imagen);
        });
  
        this.images = imageslocal;
      }
      catch
      {
        this.errorImagenes.set(true);
      }

      this.cargandoImagenes.set(false);
    }


    ngAfterViewInit(): void{
      const video = document.querySelector('.video-player') as HTMLVideoElement;

      if (video) {
        // Play the video if muted and autoplay is allowed
        video.play().catch(error => {
          console.error('Autoplay was prevented:', error);

          // Add event listeners for user interaction
          document.addEventListener('click', this.playVideoOnInteraction.bind(this), { once: true });
          window.addEventListener('scroll', this.playVideoOnInteraction.bind(this), { once: true });
          window.addEventListener('touchstart', this.playVideoOnInteraction.bind(this), { once: true });
        });
      }
    }

    playVideoOnInteraction() {
      const video = document.querySelector('.video-player') as HTMLVideoElement;
      video.play().catch(err => console.error('Failed to play:', err));
  
      // Remove event listeners after the video starts playing
      document.removeEventListener('click', this.playVideoOnInteraction.bind(this));
      window.removeEventListener('scroll', this.playVideoOnInteraction.bind(this));
      window.removeEventListener('touchstart', this.playVideoOnInteraction.bind(this));
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    toggleRotation(imageId: number) {
      this.rotatingImages[imageId] = true;
      const image = this.imagesTienda.find(img => img.id === imageId);
  
      if (image) {
        // Change image when halfway through the rotation (500ms)
        setTimeout(() => {
          image.current_image = image.current_image === image.front_image ? image.back_image : image.front_image;
        }, 500);
    
        // Reset the rotation after animation completes (1s)
        setTimeout(() => {
          this.rotatingImages[imageId] = false;
        }, 1000);
      }
    }

    checkIfMobile(): boolean {
      const userAgent = navigator.userAgent;
  
      // Check if the device is an Android or iOS device
      return /android|iPad|iPhone|iPod/i.test(userAgent);
    }

    async onEventoClicked(nombreId: string) {
      // Navigate to the route with the card title as a parameter
      this.router.navigate(['/', this.idiomaSeleccionado, "eventos", nombreId]);
      await this.delay(200);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    delay(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}
