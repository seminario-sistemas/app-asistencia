import { Facultad } from './facultad';
export class Estudiante {
    id: number
    nombre: string
    correo_personal: string
    dpi: string
    carnet: number
    jornada: string
    facultad: Facultad
    
    constructor(estudiante: any) {
        this.id = estudiante.id;
        this.nombre = estudiante.nombre;
        this.correo_personal = estudiante.correo_personal;
        this.dpi = estudiante.dpi;
        this.carnet = estudiante.carnet;
        this.jornada = estudiante.jornada;
        this.facultad = estudiante.facultad;
    }
}