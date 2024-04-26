import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import { WorkSpaceService } from '../services/work-space.service';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkSpace } from '../interfaces/work-space-interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../auth/interfaces/user';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { boardsService } from '../../services/boards-service';
import { ChatHelpComponent } from '../../chatHelp/chat-help/chat-help.component';




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
        NgbAccordionModule
    ],
    templateUrl: './work-space-page.component.html',
    styleUrl: './work-space-page.component.css',
})
export class WorkSpacePageComponent implements OnInit{
    panelOpenState = false;
    #UsersService = inject(UsersService)
    #WorkSpaceService = inject(WorkSpaceService)
    user!: User;
    workSpace: WritableSignal<WorkSpace[]> = signal([]);
    workSpaceMiembros: WritableSignal<WorkSpace[]> = signal([]);

    texto = "";
    #WorkService = inject(WorkSpaceService);

    ngOnInit(): void {
        this.#UsersService.idUsuarioLogueado().subscribe({
            next: (userInfo) => {
                this.user = userInfo;
                console.log(this.user)
                this.getEspaciosDeTrabajo(userInfo._id!)
                this.getEspaciosDeTrabajoMiembros(userInfo._id!)
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


    deleteWorkSpace(workSpace: WorkSpace){
        this.#WorkService.deleteEspacioDeTrabajo(workSpace._id!).subscribe({
            next: () => {
                this.workSpace.set(this.workSpace().filter((p) => p !== workSpace));

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
        
        this.#WorkService.addEspacioDeTrabjo(workSpaceInfo).subscribe({
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
    
}
