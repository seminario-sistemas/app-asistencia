import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public copy: string;
  public estudiantes: any;
  public estudiantesActual: any;
  public actual;
  public anterior;
  public siguiente;
  public registros;
  public paginas;
  constructor() {
    this.actual = 1;
    this.anterior = 1;
    this.siguiente = 2;
    this.obtenerEstudiantes().then(() => {
      this.registros = this.estudiantes.length;
      this.estudiantesActual = this.estudiantes.slice(0,9)
      console.log(this.estudiantesActual)
      this.paginas = Math.ceil(this.registros / 10)
    })   
  }

  ngOnInit() {
  }

  async obtenerEstudiantes() {
    return await fetch('http://localhost:8080/estudiante')
      .then(res => res.json())
      .then(res => {this.estudiantes = res});
  }
}
