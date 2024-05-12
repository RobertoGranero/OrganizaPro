import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import { WorkSpaceService } from '../services/work-space.service';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkSpace } from '../interfaces/work-space-interfaces';
import { UsersService } from '../../users/users.service';
import { User } from '../../auth/interfaces/user';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ChatHelpComponent } from '../../chatHelp/chat-help/chat-help.component';
import { Tablero } from '../../interfaces/tablero-interfaces';
import { AddUsersModalComponent } from '../../modals/add-users-modal/add-users-modal.component';
import { AutoanimateDirective } from '../../autoanimate.directive';




@Component({
    selector: 'work-space-page',
    standalone: true,
    imports: [
        CommonModule,
        TopMenuComponent,
        ReactiveFormsModule,
        RouterLink,
        FormsModule,
        ChatHelpComponent,
        NgbAccordionModule,
        AutoanimateDirective
    ],
    templateUrl: './work-space-page.component.html',
    styleUrl: './work-space-page.component.css',
})
export class WorkSpacePageComponent implements OnInit{
    panelOpenState = false;
    #UsersService = inject(UsersService)
    #WorkSpaceService = inject(WorkSpaceService)
    #modalService = inject(NgbModal);
    user!: User;
    workSpace: WritableSignal<WorkSpace[]> = signal([]);
    workSpaceMiembros: WritableSignal<WorkSpace[]> = signal([]);
    tableros: WritableSignal<Tablero[]> = signal([]);
    texto = "";

    ngOnInit(): void {
        this.#UsersService.getUsuarioLogueado().subscribe({
            next: (userInfo) => {
                this.user = userInfo;
                this.getEspaciosDeTrabajo(userInfo._id!)
                this.getEspaciosDeTrabajoMiembros(userInfo._id!)
                this.getTablerosCreadosRecientemente(userInfo._id!)
            }
        })
    }

    getEspaciosDeTrabajo(id: string){
        this.#WorkSpaceService.getEspaciosDeTrabajo(id).subscribe({
            next: (workSpaceInfo) => {                
                this.workSpace.set(workSpaceInfo);
            }
        })
    }

    getEspaciosDeTrabajoMiembros(id: string){
        this.#WorkSpaceService.getEspaciosDeTrabajoMiembros(id).subscribe({
            next: (workSpaceInfo) => {                
                this.workSpaceMiembros.set(workSpaceInfo);
            }
        })
    }

    getTablerosCreadosRecientemente(id: string){
        this.#WorkSpaceService.getTablerosDeEspaciosDeTrabajos(id).subscribe({
            next: (tableroInfo) => {                
                this.tableros.set(tableroInfo);
            }
        })
    }

    deleteWorkSpace(workSpace: WorkSpace){
        this.#WorkSpaceService.deleteEspacioDeTrabajo(workSpace._id!).subscribe({
            next: () => {
                this.workSpace.set(this.workSpace().filter((p) => p !== workSpace));
                this.tableros.set(this.tableros().filter((p) => p.espacioTrabajo !== workSpace._id))

            }
        })
    }

    onEnterPressed(event: Event){
        const workSpaceInfo: WorkSpace = {
            titulo: this.texto,
            creadoPor: this.user._id!,
            fecha: Date.now(),
            miembros: [],

        };
        
        this.#WorkSpaceService.addEspacioDeTrabjo(workSpaceInfo).subscribe({
            next: (result) => {
                this.workSpace().push(result);
                event.preventDefault();
                this.texto = "";

            },
        });
    }


    creadoEstaSemana(fechaCreacion: number): boolean{
        const date = new Date(fechaCreacion);
        const today = new Date();
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }

    addMiembros(idEspacioTrabajo: string, espacioDeTrabajoDetalle: WorkSpace){
        const modalRef = this.#modalService.open(AddUsersModalComponent, {
            centered: true,
        });

        modalRef.componentInstance.idUser = this.user?._id;
        modalRef.componentInstance.idEspacioTrabajo = idEspacioTrabajo;
        modalRef.componentInstance.espacioDeTrabajo = espacioDeTrabajoDetalle;

    }

    estaOscuro(color: string): boolean {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);

        const iluminacion = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return iluminacion < 128;
    }


    
}
