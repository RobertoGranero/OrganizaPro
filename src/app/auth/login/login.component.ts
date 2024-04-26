import { Component, EventEmitter, NgZone, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import {
    FormControl,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserLogin } from '../interfaces/user';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoadGoogleApiService } from '../../google-login/load-google-api.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleLoginDirective } from '../../google-login/google-login.directive';

@Component({
    selector: 'login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, NgbToastModule, GoogleLoginDirective],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
    #router = inject(Router);
    #authService = inject(AuthService);
    #loadGoogle = inject(LoadGoogleApiService);
    #ngZone = inject(NgZone);

    iconGoogle = faGoogle;
    credentialsSub!: Subscription;

    checked: boolean = false;

    #fb = inject(NonNullableFormBuilder);

    email = this.#fb.control('', [Validators.required, Validators.email]);
    password = this.#fb.control('', [Validators.required]);
    formLogin = this.#fb.group({
        email: this.email,
        password: this.password,
    });

    show = false;

    ngOnInit(): void {
        this.credentialsSub = this.#loadGoogle.credential$.subscribe(
            (resp) => {
                this.#authService.loginGoogle(resp.credential).subscribe({
                    next: () => {
                        this.#ngZone.run(() => this.#router.navigate(['/posts']));
                    }
                })
            }
        );
    }

    ngOnDestroy(): void {
        this.credentialsSub.unsubscribe();
    }

    login() {
        const userLogin: UserLogin = {
            ...this.formLogin.getRawValue(),
        };


        this.#authService.login(userLogin).subscribe({
            next: () => {
                this.#router.navigate(['/work-space']);
            },
            error: (err) => {
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                }, 5000);
                console.log(err);
            },
        });
    }

    validClasses(control: FormControl, validClass: string, errorClass: string) {
        return {
            [validClass]: control.dirty && control.valid,
            [errorClass]: control.dirty && control.invalid,
        };
    }

}
