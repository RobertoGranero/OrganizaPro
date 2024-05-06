import { User } from "../../auth/interfaces/user";

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
    lengthEstaHecho?: number;
    comentarios?: Comentarios[];
    checkList?: CheckList[];
    prioridad?: string;
}

export interface CheckList {
    _id?: string;
    titulo: string;
    estaHecho?: boolean;
    usuario: string
    fechaInicio?: string;
    fechaFin?: string;
}

export interface Comentarios {
    _id?: string;
    contenido: string;
    usuario?: User;
    fechaCreacion?: Date;
}