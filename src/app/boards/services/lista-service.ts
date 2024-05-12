import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Lista, Tarjeta } from '../interfaces/lista-interfaces';


@Injectable({
    providedIn: 'root',
})
export class listService {
    #http = inject(HttpClient);
    #listasUrl = 'listas';


    getListas(id: string): Observable<Lista[]> {
        return this.#http.get<Lista[]>(`${this.#listasUrl}/${id}` ).pipe(map((result) => result))
    }
    postListas(infoLista: Lista): Observable<Lista>{
        return this.#http.post<Lista>(`${this.#listasUrl}`, infoLista).pipe(map((result) => result))
    }
    deleteLista(idLista: string): Observable<Lista> {
        return this.#http.delete<Lista>(`${this.#listasUrl}/${idLista}` ).pipe(map((result) => result))
    }

    putTituloLista(id: string, editLista: string): Observable<void>{
        const tituloInfo = {
            titulo: editLista
        }
        return this.#http.put<void>(`${this.#listasUrl}/${id}/tituloLista`, tituloInfo).pipe(map((result) => result))

    }
    
}