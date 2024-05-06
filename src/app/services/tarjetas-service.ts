import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CheckList, Comentarios, Tarjeta } from '../boards/interfaces/lista-interfaces';


@Injectable({
    providedIn: 'root',
})
export class tarjetaService {
    #http = inject(HttpClient);
    #tarjetasUrl = 'tarjetas';


    postTarjetas(id: string, infoLista: Tarjeta): Observable<Tarjeta>{
        return this.#http.post<Tarjeta>(`${this.#tarjetasUrl}/${id}/tarjetas`, infoLista).pipe(map((result) => result))
    }
    deleteTarjeta(id: string, idTarjeta: string): Observable<Number>{
        return this.#http.delete<Number>(`${this.#tarjetasUrl}/${id}/tarjeta/${idTarjeta}/deleteTarjeta`).pipe(map((result) => result))
    }

    cambiarTarjetaDeLista(id: string, tarjeta: Tarjeta): Observable<Tarjeta>{
        return this.#http.post<Tarjeta>(`${this.#tarjetasUrl}/${id}/nuevaTarjetaLista`, tarjeta).pipe(map((result) => result))
    }
    borrarTarjetaDeLista(id: string, indice: number): Observable<Tarjeta[]>{
        return this.#http.delete<Tarjeta[]>(`${this.#tarjetasUrl}/${id}/tarjetaDelete/${indice}`).pipe(map((result) => result))
    }

    postCheckListTarjeta(id: string, checkList: Tarjeta, idTarjeta: string): Observable<CheckList>{
        return this.#http.post<CheckList>(`${this.#tarjetasUrl}/${id}/checkList/${idTarjeta}`, checkList).pipe(map((result) => result))
    }

    getCheckListDelUsuario(idUsuario: string): Observable<CheckList[]>{
        return this.#http.get<CheckList[]>(`${this.#tarjetasUrl}/checkList/${idUsuario}`).pipe(map((result) => result))
    }

    postCheck(id: string, idTarjeta: string, idCheck: string, check: boolean): Observable<Tarjeta>{
        const checkInfo = {
            check: check
        }
        return this.#http.post<Tarjeta>(`${this.#tarjetasUrl}/${id}/check/${idTarjeta}/${idCheck}/addCheck`, checkInfo).pipe(map((result) => result))

    }

    deleteCheck(id: string, idTarjeta: string, idCheck: string): Observable<Tarjeta>{
        return this.#http.delete<Tarjeta>(`${this.#tarjetasUrl}/${id}/check/${idTarjeta}/${idCheck}/deleteCheck`).pipe(map((result) => result))

    }

    editTarjeta(id: string, tarjeta: Tarjeta, idTarjeta: string): Observable<Tarjeta>{

        return this.#http.put<Tarjeta>(`${this.#tarjetasUrl}/${id}/edit/${idTarjeta}`, tarjeta).pipe(map((result) => result))
    }

    getComentarios(id: string, idTarjeta: string): Observable<Comentarios[]>{
        return this.#http.get<Comentarios[]>(`${this.#tarjetasUrl}/${id}/getComentarios/${idTarjeta}`).pipe(map((result) => result))
    }

    addComentarios(id: string, comentario: Comentarios, idTarjeta: string): Observable<Comentarios>{
        return this.#http.post<Comentarios>(`${this.#tarjetasUrl}/${id}/comentarios/${idTarjeta}`, comentario).pipe(map((result) => result))
    }

/*     checkTarea(id: string, idTarjeta: string, idCheckList: string, check: boolean): Observable<CheckList>{
        const checkJson = {
            check: check
        }
        return this.#http.post<CheckList>(`${this.#tarjetasUrl}/${id}/checkList/${idTarjeta}/estaHecho/${idCheckList}`, checkJson).pipe(map((result) => result))
    } */
}