import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { User, UserLogin } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { TokenResponse, UserResponse } from '../../interfaces/responses';
import { Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    #logged: WritableSignal<boolean> = signal(false);
    #http = inject(HttpClient);
    #authUrl = 'auth';
    #router = inject(Router);
    cookieService = inject(SsrCookieService);

    get logged() {
        return this.#logged.asReadonly(); // Señal de solo lectura
    }
    constructor() {
        if (this.cookieService.check('token')) this.#logged.set(true);
    }

    userRegister(userInfo: User): Observable<UserResponse> {
        return this.#http
            .post<UserResponse>(`${this.#authUrl}/register`, userInfo)
            .pipe(map((result) => result));
    }

    login(data: UserLogin): Observable<void> {
        return this.#http
            .post<TokenResponse>(`${this.#authUrl}/login`, data)
            .pipe(
                map((r) => {
                    this.cookieService.set('token', r.accessToken);
                    this.#logged.set(true);
                })
            );
    }

    loginGoogle(tokenString: string): Observable<void> {
        const tokenGoogle = { token: tokenString };
        return this.#http
            .post<TokenResponse>(`${this.#authUrl}/google`, tokenGoogle)
            .pipe(
                map((result) => {
                    this.#logged.set(true);
                    this.cookieService.set('token', result.accessToken);
                })
            );
    }

    isLogged(): Observable<boolean> {
        if (this.#logged() === false && !this.cookieService.check('token')) {
            return of(false);
        }

        if (this.#logged() === true) {
            return of(true);
        }

        if (this.#logged() === false && this.cookieService.check('token')) {
            return this.#http.get(`auth/validate`).pipe(
                map(() => {
                    this.#logged.set(true);
                    return true;
                }),
                catchError(() => {
                    this.cookieService.delete('token');
                    return of(false);
                })
            );
        }

        return of(false);
    }

    checkToken(): Observable<TokenResponse> {
        return this.#http
            .get<TokenResponse>(`${this.#authUrl}/validate`)
            .pipe(map((result) => result));
    }

    logout(): void {
        this.cookieService.delete('token', '/');
        this.#logged.set(false);
        location.reload()

    }

    deleteAccount(id: string) {
        return this.#http
            .delete<void>(`${this.#authUrl}/${id}`)
            .pipe(map((result) => {
                this.cookieService.delete('token');
                this.#logged.set(false);
                location.reload()
                return result
            }));
    }
}
