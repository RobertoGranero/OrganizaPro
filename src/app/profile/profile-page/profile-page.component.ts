import { Component, Input, OnInit, inject } from '@angular/core';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import { ProfileService } from '../services/profile.service';
import { User, UserPasswordEdit, UserProfileEdit } from '../../auth/interfaces/user';
import { AvatarModule } from 'ngx-avatars';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgbNavModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'profile-page',
    standalone: true,
    imports: [
        TopMenuComponent,
        AvatarModule,
        ReactiveFormsModule,
        NgbNavModule,
        NgbToastModule
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
    active = 'top';

    #profileService = inject(ProfileService);
    @Input() id!: string;
    user!: User;
    #fb = inject(NonNullableFormBuilder);

    nombre = this.#fb.control('', [Validators.required, Validators.email]);
    apellidos = this.#fb.control('', [Validators.required]);
    email = this.#fb.control('', [Validators.required]);
    biografia = this.#fb.control('', [Validators.required]);
    formEditProfile = this.#fb.group({
        nombre: this.nombre,
        apellidos: this.apellidos,
        email: this.email,
        biografia: this.biografia
    });


    password = this.#fb.control('', [Validators.required]);
    formEditPassword = this.#fb.group({
        password: this.password,

    });
    show = false;


    ngOnInit(): void {
        console.log(this.id);
        this.getProfile();
    }

    getProfile() {
        this.#profileService.getUser(this.id!).subscribe({
            next: (value) => {
                this.user = value;
                this.nombre.setValue(value.nombre)
                this.apellidos.setValue(value.apellidos)
                this.email.setValue(value.email)
                this.biografia.setValue(value.biografia!)
            },
        });
    }

    editProfile() {

        const infoEditProfile: UserProfileEdit = {
            ...this.formEditProfile.getRawValue()
        }

        this.#profileService.updateProfile(this.user._id!, infoEditProfile).subscribe({
            next: (value) => {
                this.user = value;
                this.show = true;
                setTimeout(() =>{
                    this.show = false;

                },4000)
            }
        })
    }

    editPassword() {
        const infoEditPassword: UserPasswordEdit = {
            ...this.formEditPassword.getRawValue()
        }

        this.#profileService.updatePassword(this.user._id!, infoEditPassword).subscribe({
            next: (value) => {
            }
        })
    }
}
