export class Reserva {
    constructor(
      public nombre: string,
      public email: string,
      public telefono: Date,
      public eventoId: string,
      public id?: string,
      public aceptaComunicaciones?: boolean
    ) {}
}