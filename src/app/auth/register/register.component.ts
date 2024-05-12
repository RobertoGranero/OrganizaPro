import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserLogin } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { read } from '@popperjs/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { LoadGoogleApiService } from '../../google-login/load-google-api.service';
import { GoogleLoginDirective } from '../../google-login/google-login.directive';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbToastModule, GoogleLoginDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy{

    #router = inject(Router);
    #authService = inject(AuthService);
    #loadGoogle = inject(LoadGoogleApiService);
    #ngZone = inject(NgZone);

    iconGoogle = faGoogle;
    credentialsSub!: Subscription;
    checkedRegister: boolean = false;
    image!: string;
    #fb = inject(NonNullableFormBuilder);
    nombre = this.#fb.control('', [Validators.required]);
    apellidos = this.#fb.control('', [Validators.required]);
    email = this.#fb.control('', [Validators.required, Validators.email]);
    password = this.#fb.control('', [Validators.required]);
    formRegister = this.#fb.group({
        nombre: this.nombre,
        apellidos: this.apellidos,
        email: this.email,
        password: this.password,
    });

    show = false;
    avatarBase64: string = '';

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

    close() {
		this.show = false;
	}

    register() {
        const userRegister: User = {
            ...this.formRegister.getRawValue(),
        };

        this.#authService.userRegister(userRegister).subscribe({
            next: () => {
                this.#router.navigate(['/work-space'])
            },
            error: (err) => {
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
