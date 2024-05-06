import { Injectable, inject } from '@angular/core';
import { WorkSpace } from '../interfaces/work-space-interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../../auth/interfaces/user';
import { Tablero } from '../../interfaces/tablero-interfaces';

@Injectable({
    providedIn: 'root',
})
export class WorkSpaceService {
    #http = inject(HttpClient);
    #workSpaceUrl = 'espacioDeTrabajo';
    #router = inject(Router);

    addEspacioDeTrabjo(userInfo: WorkSpace): Observable<WorkSpace> {
        return this.#http
            .post<WorkSpace>(`${this.#workSpaceUrl}`, userInfo)
            .pipe(map((result) => result));
    }

    getEspaciosDeTrabajo(id: string): Observable<WorkSpace[]> {
        return this.#http.get<WorkSpace[]>(`${this.#workSpaceUrl}/creador/${id}` ).pipe(map((result) => result))
    }
    getEspaciosDeTrabajoMiembros(id: string): Observable<WorkSpace[]> {
        return this.#http.get<WorkSpace[]>(`${this.#workSpaceUrl}/miembrosEspacioTrabajo/${id}` ).pipe(map((result) => result))
    }
    getEspaciosDeTrabajoDetalle(id: string): Observable<WorkSpace> {
        return this.#http.get<WorkSpace>(`${this.#workSpaceUrl}/${id}` ).pipe(map((result) => result))
    }
    deleteEspacioDeTrabajo(id: string): Observable<void> {
        return this.#http.delete<void>(`${this.#workSpaceUrl}/${id}`)
    }
    getTablerosDeEspaciosDeTrabajos(id: string) : Observable<Tablero[]>{
        return this.#http.get<Tablero[]>(`${this.#workSpaceUrl}/creador/${id}/tableros`).pipe(map((result) => result))
    }

}
