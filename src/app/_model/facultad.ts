export class Facultad {
    id: number 
    nombre: string

    constructor(facultad: any) {
        this.id = typeof facultad.id != 'undefined'? facultad.id : null;
        this.nombre = typeof facultad.nombre != 'undefined' ? facultad.nombre : '';
    }
}