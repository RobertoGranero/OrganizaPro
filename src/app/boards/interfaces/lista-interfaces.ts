
export interface Lista {
    _id?: string;
    titulo: string;
    tablero: string;
    fecha?: string;
    tarjetas: Tarjeta[]
}

export interface Tarjeta {
    _id?: string;
    titulo: string;
    descripcion?: string;
    comentarios?: Comentarios[];
    checkList?: CheckList[];
}

export interface CheckList {
    _id?: string;
    titulo: string;
    fechaInicio?: string;
    fechaFin?: string;
}

export interface Comentarios {
    _id?: string;
    contenido: string;
    usuario?: string;
    fechaCreacion?: Date;
}