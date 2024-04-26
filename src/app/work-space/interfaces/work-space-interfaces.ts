export interface WorkSpace {
    _id?: string;
    titulo: string;
    creadoPor: string;
    fecha?: number,
    miembros?: miembros[]
}

export interface miembros {
    _id?: string,
    usuario?: string;

}