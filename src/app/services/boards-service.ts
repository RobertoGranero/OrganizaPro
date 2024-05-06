import { Injectable, inject } from '@angular/core';
import { WorkSpace } from '../work-space/interfaces/work-space-interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../auth/interfaces/user';
import { Tablero } from '../interfaces/tablero-interfaces';

@Injectable({
    providedIn: 'root',
})
export class boardsService {
    #http = inject(HttpClient);
    #tablerosUrl = 'tableros';



    getTableros(id: string): Observable<Tablero[]> {
        return this.#http.get<Tablero[]>(`${this.#tablerosUrl}/tablerosEspacioTrabajo/${id}` ).pipe(map((result) => result))
    }
    getTablero(id: string): Observable<Tablero> {
        return this.#http.get<Tablero>(`${this.#tablerosUrl}/${id}` ).pipe(map((result) => result))
    }
    postTablero(tableroInfo: Tablero): Observable<Tablero>{
        console.log(tableroInfo)
        return this.#http.post<Tablero>(`${this.#tablerosUrl}`, tableroInfo).pipe(map((result) => result))

    }

    putTablero(id: string, infoTablero: Tablero): Observable<Tablero>{
        return this.#http.put<Tablero>(`${this.#tablerosUrl}/${id}`, infoTablero).pipe(map((result) => result))
    } 

    deleteTablero(id: string): Observable<Tablero>{
        return this.#http.delete<Tablero>(`${this.#tablerosUrl}/${id}` ).pipe(map((result) => result))

    }

}