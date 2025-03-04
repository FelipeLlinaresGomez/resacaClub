export class Contacto {
    constructor(
      public nombre: string,
      public email: string,
      public asunto: string,
      public mensaje: string,
      public aceptaComunicaciones?: boolean
    ) {}
}