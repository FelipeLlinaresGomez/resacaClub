import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../core/servicies/global.service';

@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrl: './pagina-no-encontrada.component.css'
})

export class PaginaNoEncontradaComponent {
  private subscription!: Subscription;
    
  PaginaNoEncontrada!: string;
  IrInicio!: string;

  protected idiomaSeleccionado!: string;

  constructor(private globalService: GlobalService) {}

    ngOnInit(): void {
      //Access the global variable
      this.subscription = this.globalService.idiomaSeleccionado.subscribe(
        (idioma) => {
            this.idiomaSeleccionado = idioma;
            this.PaginaNoEncontrada = this.globalService.translate('PaginaNoEncontrada');
            this.IrInicio = this.globalService.translate('IrInicio');
          }
      );
    }

    ngAfterViewInit(): void{
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

