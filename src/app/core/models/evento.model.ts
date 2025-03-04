export class Evento {
  constructor(
    public nombre: string,
    public nombreId: string,
    public fecha: Date,
    public descripcion: string,
    public imagen: string,
    public descripcion_en?: string,
    public lat?:  number,
    public lon?: number,
    public mostrarListaReservas?: boolean,
    public nombreEnlaceTickets?: string,
    public urlTickets?: string,
    public id?: string
  ) {}
}