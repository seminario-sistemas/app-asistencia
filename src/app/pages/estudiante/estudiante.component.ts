import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  public copy: string;
  constructor() { }

  ngOnInit() {
  }

  grabarEstudiante(estudiante) {
    fetch(`http://localhost:8080/estudiante`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante),
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log('Agregado'))
      .catch(error => console.log('error', error));
  }

  obtenerFacultades(){
    fetch(`http://localhost:8080/facultad`)
    .then()
  }
}
