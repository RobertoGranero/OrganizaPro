import { Component, Input, OnInit, WritableSignal, computed, inject, input, signal } from '@angular/core';
import {
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Tablero } from '../../interfaces/tablero-interfaces';
import { UsersService } from '../../users/users.service';
import { User } from '../../auth/interfaces/user';
import { AvatarModule } from 'ngx-avatars';
import { WorkSpace, miembros } from '../../work-space/interfaces/work-space-interfaces';

@Component({
    selector: 'add-users-modal',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, AvatarModule],
    templateUrl: './add-users-modal.component.html',
    styleUrl: './add-users-modal.component.css',
})
export class AddUsersModalComponent implements OnInit{


    #userService = inject(UsersService);
    activeModal = inject(NgbActiveModal);
    @Input() idUser!: string;
    @Input() idEspacioTrabajo!: string;
    @Input() espacioDeTrabajo!: WorkSpace;
    usuarios: WritableSignal<User[]> = signal([]);
    miembros!: User;
    search = signal('');
    ngOnInit(): void {
        console.log(this.espacioDeTrabajo)
        this.getUsuarios()
    }

    filteredUsarios = computed(() =>
    this.usuarios().filter(
        (p) =>
            p.nombre?.toLowerCase().includes(this.search().toLowerCase()) ||
            p.email?.toLowerCase().includes(this.search().toLowerCase()) ||
            p.apellidos?.toLowerCase().includes(this.search().toLowerCase())
    )
);

    getUsuarios(){
        this.#userService.getUsuarios().subscribe({
            next: (user) => {
                this.usuarios.set(user)
            }
        })
    }

    addUsers(usuario: User) {

        this.#userService.invitarUsuarioEspacioTrabajo(this.idEspacioTrabajo, usuario._id!).subscribe({
            next:(result) => {
                this.espacioDeTrabajo.miembros = result.miembros
            }
        })
        
    }

    comprobarUsuarios(usuario: User) : boolean{

        const miembroEncontrado = this.espacioDeTrabajo.miembros?.find((miembro) => miembro.usuario === usuario._id)

        if(miembroEncontrado?.usuario !== usuario._id && usuario._id !== this.idUser) return true;


        return false;
    }



}
