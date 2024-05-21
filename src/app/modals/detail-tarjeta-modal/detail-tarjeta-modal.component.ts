import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { NgbActiveModal, NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckList, Comentarios, Tarjeta } from '../../boards/interfaces/lista-interfaces';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tarjetaService } from '../../services/tarjetas-service';
import { CommonModule } from '@angular/common';
import { WorkSpaceService } from '../../work-space/services/work-space.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../auth/interfaces/user';
import { AvatarModule } from 'ngx-avatars';
import { ProfileService } from '../../profile/services/profile.service';
import { faPaperPlane, faCircleExclamation, faSquareCheck as faCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'detail-tarjeta-modal',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule, AvatarModule, FontAwesomeModule, NgbNavModule, NgbProgressbarModule],
    templateUrl: './detail-tarjeta-modal.component.html',
    styleUrl: './detail-tarjeta-modal.component.css',
})
export class DetailTarjetaModalComponent implements OnInit{
    #tarjetaService = inject(tarjetaService)
    #usuariosService = inject(UsersService)
    #profileService = inject(ProfileService)
    #espacioTrabajoService = inject(WorkSpaceService)
    activeModal = inject(NgbActiveModal);
    @Input() tarjeta?: Tarjeta;
    @Input() listaTitulo?: string;
    @Input() idLista?: string;
    @Input() idEspacioTrabajo?: string;
    showCheckList: boolean = false;
    check: boolean = false;
    showTarjetaEdit!: boolean;
    miembros: User[] = [];
    comentarios: WritableSignal<Comentarios[]> = signal([]);
    mediaProgressbar: number = 0;
    usuarioLogueado!: User;
    #fb = inject(NonNullableFormBuilder);
    icons = { faPaperPlane, faCircleExclamation, faSquareCheck, faCheckSolid }

    valorPredeterminado: string = "";
    titulo = this.#fb.control('', [Validators.required]);
    usuario = this.#fb.control("",);
    fechaInicio = this.#fb.control('',);
    fechaFin = this.#fb.control('',);
    formCheckList = this.#fb.group({
        titulo: this.titulo,
        usuario: this.usuario,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
    });

    tituloTarjeta = this.#fb.control('', [Validators.required]);
    descripcion = this.#fb.control('', [Validators.required]);
    prioridad = this.#fb.control('', [Validators.required]);
    formTarjeta = this.#fb.group({
        tituloTarjeta: this.tituloTarjeta,
        descripcion: this.descripcion,
        prioridad: this.prioridad
    });

    contenido = this.#fb.control('', [Validators.required]);
    formComentario = this.#fb.group({
        contenido: this.contenido
    });


    ngOnInit(): void {

        this.showTarjetaEdit = this.tarjeta?.descripcion ? true: false;
        this.miembrosEspacioTrabajo();
        this.getUsuarioLogueado();
        this.getComments();
        this.descripcion.setValue(this.tarjeta?.descripcion!)
        this.tituloTarjeta.setValue(this.tarjeta?.titulo!)
        this.prioridad.setValue(this.tarjeta?.prioridad!)
        this.mediaProgressbar = (this.tarjeta?.lengthEstaHecho! * 100) / this.tarjeta?.checkList?.length!
    }

    getUsuarioLogueado(){
        this.#usuariosService.getUsuarioLogueado().subscribe({
            next: (resp) => {
                this.usuarioLogueado = resp;
                this.getAvatar(resp._id!)
                this.usuario.setValue(this.usuarioLogueado.nombre)

            }
        })
    }

    getAvatar(idUsuario: string) {

        this.#profileService.getUser(idUsuario).subscribe({
            next: (value) => {
                this.usuarioLogueado.avatar = value.avatar;
            },
        });
    } 

    miembrosEspacioTrabajo(){
        this.#espacioTrabajoService.getEspaciosDeTrabajoDetalle(this.idEspacioTrabajo!).subscribe({
            next: (resp) => {
                this.#usuariosService.getUsuarios().subscribe({
                    next: (usuario) =>{
                        const usuarioCreador = usuario.find((user) => user._id === resp.creadoPor);
                        this.miembros.push(usuarioCreador!)

                        resp.miembros?.forEach((miembro) => {
                            const usuariosMiembros = usuario.find((user) => user._id === miembro.usuario);
                            this.miembros.push(usuariosMiembros!)
                        })
                    }
                })
            }
        })
    }

    addCheckList(){
        
        const checkListInfo: CheckList = {
            ...this.formCheckList.getRawValue(),
            estaHecho: false
        }

        this.#tarjetaService.postCheckListTarjeta(this.idLista!, checkListInfo, this.tarjeta?._id!).subscribe({
            next: (resp) => {
                const respTarjeta = resp.checkList?.find((tarea) => tarea.usuario === this.usuario.value && tarea.titulo === this.titulo.value)
                this.tarjeta?.checkList?.push(respTarjeta!)
                this.formCheckList.reset()
                this.showCheckList = false;

            }
        })
    }

    deleteCheckList(idCheckList: string){
        this.#tarjetaService.deleteCheckListTarjeta(this.idLista!, this.tarjeta?._id!, idCheckList).subscribe({
            next: (resp) => {
                this.tarjeta?.checkList?.splice(+resp, 1)
            }
        })
    }

    editTarjeta(){

        const tarjetaEdit: Tarjeta = {
            titulo: this.tituloTarjeta.value,
            descripcion: this.descripcion.value,
            prioridad: this.prioridad.value
        }

        this.#tarjetaService.editTarjeta(this.idLista!, tarjetaEdit, this.tarjeta?._id!).subscribe({
            next: (resp) => {
                this.tarjeta!.descripcion = resp.descripcion;
                this.tarjeta!.titulo = resp.titulo;
                this.tarjeta!.prioridad = resp.prioridad;
                this.showTarjetaEdit = true;
            }
        })
    }

    getComments(){
        this.#tarjetaService.getComentarios(this.idLista!, this.tarjeta?._id!).subscribe({
            next: (resp) => {
                this.comentarios.set(resp)
            }
        })
    }

    postCheckTarea(checkList: CheckList){
        this.#tarjetaService.postCheck(this.idLista!, this.tarjeta?._id!, checkList._id!, true).subscribe({
            next: (resp) => {
                this.tarjeta!.lengthEstaHecho!++;
                checkList.estaHecho = true;
                this.mediaProgressbar = (this.tarjeta?.lengthEstaHecho! * 100) / this.tarjeta?.checkList?.length!

            }
        })

    }

    deleteCheckTarea(checkList: CheckList){
        this.#tarjetaService.deleteCheck(this.idLista!, this.tarjeta?._id!, checkList._id!).subscribe({
            next: (resp) => {
                this.tarjeta!.lengthEstaHecho!--;
                checkList.estaHecho = false;
                this.mediaProgressbar = (this.tarjeta?.lengthEstaHecho! * 100) / this.tarjeta?.checkList?.length!

            }
        })
    }

    addComment(){
        const comentarioInfo: Comentarios = {
            ...this.formComentario.getRawValue(),
            usuario: this.usuarioLogueado
        }

        this.#tarjetaService.addComentarios(this.idLista!, comentarioInfo, this.tarjeta?._id!).subscribe({
            next: (resp) => {
                this.tarjeta?.comentarios?.push(comentarioInfo)
  
                this.formComentario.reset()
            }
        })
    }

    deleteTarjeta(){
        this.#tarjetaService.deleteTarjeta(this.idLista!, this.tarjeta?._id!).subscribe({
            next: (resp) => {
                this.activeModal.close(resp);
            }
        })
    }



}
