import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FacultadService } from 'src/app/_service/facultad.service';
import { Facultad } from 'src/app/_model/facultad';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.scss']
})
export class FacultadComponent implements OnInit {

  public FACULTADES: Facultad[] = [];
  public facultades: Facultad[] = [];
  public campos = [{
    label: 'Nombre de la Facultad',
    type: 'text',
    placeholder: 'Ingrese el nombre de la nueva Facultad',
    id: 'nombre'
  }]
  public page = 1;
  public pageSize = 10;
  public collectionSize = this.FACULTADES.length;
  constructor(private facultadService: FacultadService, @Inject(DOCUMENT) document, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.listar()
    this.facultadService.listar().subscribe(data => {
      this.FACULTADES = data
    })

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
  }

  listar() {
    this.facultadService.listar().subscribe(data => {
      this.FACULTADES = data
      this.collectionSize = this.FACULTADES.length;
      this.refrescar();
    })
  }

  refrescar() {
    this.facultades = this.FACULTADES
      .map((facultad, i) => ({ id: i + 1, ...facultad }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  activarEdicion(idFacultad: number, boton: any) {
    var fila = document.getElementById(`facultad_${idFacultad}`).children;
    Array.from(fila).forEach(celda => {
      Array.from(celda.children).forEach(child => {
        if (!child.classList.contains('no-cambiar')) {
          child.classList.toggle('d-none');
        }
      })
    })
    boton.innerHTML = boton.innerHTML == 'Cancelar' ? 'Editar' : 'Cancelar';
  }

  agregarRegistro() {
    this.modalService.dismissAll();
    var info = {};
    this.campos.forEach(element => {
      info[element.id] = (<HTMLInputElement>document.getElementById(`${element.id}`)).value;      
    });
    var facultad = new Facultad(info);
    this.facultadService.registrar(facultad).subscribe(data => {
      this.listar()
    })
  }

  editarRegistro(idFacultad: number) {
    var nombre = (<HTMLInputElement>document.getElementById(`${idFacultad}_nombre`)).value;
    var facultad = { id: idFacultad, nombre };
    this.facultadService.modificar(facultad).subscribe(data => {
      this.listar()
    })
  }

  eliminarRegistro(idFacultad: number) {
    this.facultadService.eliminar(idFacultad).subscribe(data => {
      this.listar()
    })
  }
}
