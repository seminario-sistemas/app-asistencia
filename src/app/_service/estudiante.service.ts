import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HOST } from './../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';
import { Estudiante } from './../_model/estudiante';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  estudianteCambio = new Subject<Estudiante[]>()
  mensajeCambio = new Subject<string>()
  url: string = HOST;
  //headers = new HttpHeaders()




  /*debemos habilitarlo en el app.module.ts */
  constructor(private http: HttpClient) {

  }



  listar() {
    return this.http.get<Estudiante[]>(`${this.url}/estudiante`)
  }

  listarPorId(id: number) {
    return this.http.get<Estudiante>(`${this.url}/estudiante/${id}`)
  }
  listarPorCarnet(carnet: string) {
    return this.http.get<Estudiante>(`${this.url}/estudiante/buscarCarnet/${carnet}`)
  }

  registrar(estudiante: Estudiante) {
    return this.http.post(`${this.url}/estudiante`, estudiante, { observe: 'response' })
  }

  modificar(estudiante: Estudiante) {
    return this.http.put(`${this.url}/estudiante`, estudiante)
  }

  eliminar(id: number) {
    console.log(`${this.url}/estudiante/${id}`)
    return this.http.delete(`${this.url}/estudiante/${id}`)
  }

}