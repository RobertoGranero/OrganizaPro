import { Component, Input, OnInit, inject } from '@angular/core';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import { ProfileService } from '../services/profile.service';
import { User, UserPasswordEdit, UserProfileEdit } from '../../auth/interfaces/user';
import { AvatarModule } from 'ngx-avatars';
import {
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgbModal, NgbNavModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/services/auth.service';
import { ConfirmModalComponent } from '../../modals/confirm-modal/confirm-modal.component';
import { matchPassword } from '../../validators/matchPassword.validator';

@Component({
    selector: 'profile-page',
    standalone: true,
    imports: [
        TopMenuComponent,
        AvatarModule,
        ReactiveFormsModule,
        NgbNavModule,
        NgbToastModule,
        FormsModule
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
    active = 'top';

    #profileService = inject(ProfileService);
    #authService = inject(AuthService);
    @Input() id!: string;
    user?: User;
    #fb = inject(NonNullableFormBuilder);
    #modalService = inject(NgbModal);
    toastText: string = "";

    avatarPerfil: string = "";
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
    rePassword = this.#fb.control('', [Validators.required, matchPassword(this.password)]);
    formEditPassword = this.#fb.group({
        password: this.password,
        rePassword: this.rePassword
    });
    show = false;


    ngOnInit(): void {
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

        this.#profileService.updateProfile(this.user?._id!, infoEditProfile).subscribe({
            next: (value) => {
                this.user = value;
                this.show = true;
                this.toastText = "Has cambiado correctamente los datos"
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

        this.#profileService.updatePassword(this.user?._id!, infoEditPassword).subscribe({
            next: (value) => {
                this.show = true;
                this.toastText = "Has cambiado correctamente la contraseña"
                setTimeout(() =>{
                    this.show = false;

                },4000)
            }
        })
    }

    changeImage(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput.files || fileInput.files.length === 0) {
            return;
        }
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.addEventListener('loadend', () => {
            const avatarPerfilString = reader.result as string;
            this.#profileService.updateAvatar(this.user?._id!, avatarPerfilString).subscribe({
                next: () => {
                    this.user!.avatar = avatarPerfilString
                    this.show = true;
                    this.toastText = "Has cambiado correctamente el avatar"

                    setTimeout(() =>{
                        this.show = false;
    
                    },4000)
                }
            });
        });
    }

    deleteAccount(){

        const modalRef = this.#modalService.open(ConfirmModalComponent, {
            centered:true
        });
        modalRef.componentInstance.title = 'Eliminar cuenta';
        modalRef.componentInstance.body = '¿Estas seguro que quieres eliminar la cuenta?';
        
        modalRef.result.then((resp) => {
            if(resp){
                this.#authService.deleteAccount(this.id).subscribe({
                    next: () => {
                        
                    }
                })
            }
        })


    }
}
