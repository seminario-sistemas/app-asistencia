import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { EstudianteService } from 'src/app/_service/estudiante.service';
import { FacultadService } from 'src/app/_service/facultad.service';
import { Estudiante } from 'src/app/_model/estudiante';
import { Facultad } from 'src/app/_model/facultad';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {

  public FACULTADES: Facultad[] = [];

  public ESTUDIANTES: Estudiante[] = [];
  public estudiantes: Estudiante[] = [];

  public page = 1;
  public pageSize = 10;
  public collectionSize = this.ESTUDIANTES.length;

  constructor(private estudianteService: EstudianteService,private facultadService: FacultadService, @Inject(DOCUMENT) document) {
  }

  ngOnInit() {
    this.listar()
    this.facultadService.listar().subscribe(data => {
      this.FACULTADES = data
    })

  }

  listar(){
    this.estudianteService.listar().subscribe(data => {
      this.ESTUDIANTES = data
      this.collectionSize = this.ESTUDIANTES.length;
      this.refrescar();
    })
  }

  refrescar() {
    this.estudiantes = this.ESTUDIANTES
      .map((estudiante, i) => ({ id: i + 1, ...estudiante }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  activarEdicion(idEstudiante: number,boton:any) {    
    var fila = document.getElementById(`estudiante_${idEstudiante}`).children;
    Array.from(fila).forEach(celda => {
      Array.from(celda.children).forEach(child => {
        if (!child.classList.contains('no-cambiar')) {
          child.classList.toggle('d-none');
        }
      })
    })
    boton.innerHTML = boton.innerHTML == 'Cancelar' ? 'Editar' : 'Cancelar';
  }

  editarRegistro(idEstudiante: number) {
    var nombre = (<HTMLInputElement>document.getElementById(`${idEstudiante}_nombre`)).value;
    var correo_personal = (<HTMLInputElement>document.getElementById(`${idEstudiante}_correo_personal`)).value;
    var dpi = (<HTMLInputElement>document.getElementById(`${idEstudiante}_dpi`)).value;
    var carnet = (<HTMLInputElement>document.getElementById(`${idEstudiante}_carnet`)).value;
    var jornada = (<HTMLInputElement>document.getElementById(`${idEstudiante}_jornada`)).value;
    var facultad = {id:(<HTMLInputElement>document.getElementById(`${idEstudiante}_facultad`)).value};
    var estudiante = new Estudiante({id:idEstudiante,nombre,correo_personal,dpi,carnet,jornada,facultad});
    this.estudianteService.modificar(estudiante).subscribe(data => {
      this.listar()
    })
  }

  eliminarRegistro(idEstudiante: number) {
    this.estudianteService.eliminar(idEstudiante).subscribe(data => {
      this.listar()
    })
  }
}
