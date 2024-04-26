import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CheckList, Tarjeta } from '../boards/interfaces/lista-interfaces';


@Injectable({
    providedIn: 'root',
})
export class tarjetaService {
    #http = inject(HttpClient);
    #tarjetasUrl = 'tarjetas';


    postTarjetas(id: string, infoLista: Tarjeta): Observable<Tarjeta>{
        return this.#http.post<Tarjeta>(`${this.#tarjetasUrl}/${id}/tarjetas`, infoLista).pipe(map((result) => result))
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

    addDescripcion(id: string, descripcion: string, idTarjeta: string): Observable<Tarjeta>{
        const descripcionEdit = {
            descripcion: descripcion
        }
        return this.#http.put<Tarjeta>(`${this.#tarjetasUrl}/${id}/descripcion/${idTarjeta}`, descripcionEdit).pipe(map((result) => result))
    }

/*     checkTarea(id: string, idTarjeta: string, idCheckList: string, check: boolean): Observable<CheckList>{
        const checkJson = {
            check: check
        }
        return this.#http.post<CheckList>(`${this.#tarjetasUrl}/${id}/checkList/${idTarjeta}/estaHecho/${idCheckList}`, checkJson).pipe(map((result) => result))
    } */
}