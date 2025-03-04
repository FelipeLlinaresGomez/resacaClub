import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-card-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-evento.component.html',
  styleUrl: './card-evento.component.css'
})
export class CardEventoComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() mostrarListaReservas!: boolean;
}
