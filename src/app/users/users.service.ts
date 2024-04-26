import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../auth/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { WorkSpace } from '../work-space/interfaces/work-space-interfaces';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    #http = inject(HttpClient);
    #authUrl = 'auth';
    #espacioDeTrabajoUrl = 'espacioDeTrabajo';

    idUsuarioLogueado(): Observable<User> {
        return this.#http
            .get<User>(`${this.#authUrl}/me`)
            .pipe(map((result) => result));
    }

    getUsuarios(): Observable<User[]> {
        return this.#http
            .get<User[]>(`${this.#authUrl}/usuarios`)
            .pipe(map((result) => result));
    }
    invitarUsuarioEspacioTrabajo(id: string, idUsuario: string): Observable<WorkSpace> {
        const infoMiembro = {
            usuario: idUsuario
        }
        return this.#http.post<WorkSpace>(`${this.#espacioDeTrabajoUrl}/miembros/${id}`, infoMiembro).pipe(map((result) => result));
    }
}
