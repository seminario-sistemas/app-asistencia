import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HOST } from './../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';
import { Facultad } from './../_model/facultad';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  facultadCambio = new Subject<Facultad[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;
  //headers = new HttpHeaders()




  /*debemos habilitarlo en el app.module.ts */
  constructor(private http: HttpClient) {

  }



  listar() {
    return this.http.get<Facultad[]>(`${this.url}/facultad`)
  }

  listarPorId(id: number) {
    return this.http.get<Facultad>(`${this.url}/facultad/${id}`)
  }

  registrar(facultad: Facultad) {
    return this.http.post(`${this.url}/facultad`, facultad, { observe: 'response' })
  }




  modificar(facultad: Facultad) {

    return this.http.put(`${this.url}/facultad`, facultad)
  }

  eliminar(id: number) {
    console.log(`${this.url}/facultad/${id}`)
    return this.http.delete(`${this.url}/facultad/${id}`)
  }

}