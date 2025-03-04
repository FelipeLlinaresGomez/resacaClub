import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evento } from '../models/evento.model';
import { environment } from '../../../environments/environment';
import { BaseApiResponse } from '../models/baseapiresponse.model';
import { Contacto } from '../models/contacto.model';
import { Imagen } from '../models/imagen.model';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private eventos: Evento[] = [];

  constructor(private http: HttpClient) { }

  getProximosEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos/proximos`);
  }

  async existeEventoProximo(eventoPath: string): Promise<Observable<BaseApiResponse>> {
    return this.http.get<BaseApiResponse>(`${this.apiUrl}/eventos/existeProximoEvento/${eventoPath}`);
  }

  async añadirReserva(idEvento: string, reserva: Reserva): Promise<Observable<BaseApiResponse>> {
    return this.http.post<BaseApiResponse>(`${this.apiUrl}/eventos/${idEvento}/crearReserva`, reserva);
  }

  async enviarCorreoContacto(contacto: Contacto): Promise<Observable<BaseApiResponse>> {
    return this.http.post<BaseApiResponse>(`${this.apiUrl}/contacto`, contacto);
  }

  getImages(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(`${this.apiUrl}/imagenes`);
  }

  setEventosLocal(eventos: Evento[]): void {
    this.eventos = eventos;
  }

  getEventosLocal(): Evento[] {
    return this.eventos;
  }
}