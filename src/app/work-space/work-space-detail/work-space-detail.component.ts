import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    WritableSignal,
    computed,
    inject,
    signal,
} from '@angular/core';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import { WorkSpaceService } from '../services/work-space.service';
import { WorkSpace } from '../interfaces/work-space-interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Tablero } from '../../interfaces/tablero-interfaces';
import {
    NgbModal,
    NgbPopover,
    NgbPopoverConfig,
    NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AddUsersModalComponent } from '../../modals/add-users-modal/add-users-modal.component';
import { boardsService } from '../../services/boards-service';
import { AddTableroModalComponent } from '../../modals/add-tablero-modal/add-tablero-modal.component';
import { UsersService } from '../../users/users.service';
import { User } from '../../auth/interfaces/user';
import { AvatarModule } from 'ngx-avatars';
import { OptionsTableroModalComponent } from '../../modals/options-tablero-modal/options-tablero-modal.component';
import { m } from '@fullcalendar/core/internal-common';

@Component({
    selector: 'work-space-detail',
    standalone: true,
    imports: [
        TopMenuComponent,
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        FormsModule,
        AvatarModule,
        NgbPopoverModule,
    ],
    templateUrl: './work-space-detail.component.html',
    styleUrl: './work-space-detail.component.css',
})
export class WorkSpaceDetailComponent implements OnInit {
    #WorkSpaceService = inject(WorkSpaceService);
    #BoardService = inject(boardsService);
    #UserService = inject(UsersService);
    @Input() id!: string;
    workSpaceDetail?: WorkSpace;
    search = signal('');
    listaTableros: WritableSignal<Tablero[]> = signal([]);
    #modalService = inject(NgbModal);
    user?: User;

    ngOnInit(): void {
        this.getWorkSpaceId();
        this.getTableros();
        this.userLogged();
    }

    getWorkSpaceId() {
        this.#WorkSpaceService.getEspaciosDeTrabajoDetalle(this.id).subscribe({
            next: (workSpaceDetail) => {
                this.workSpaceDetail = workSpaceDetail;
            },
        });
    }

    userLogged() {
        this.#UserService.idUsuarioLogueado().subscribe({
            next: (userInfo) => {
                this.user = userInfo;
            },
        });
    }

    ordenarTablero() {
        this.filteredTableros().reverse();
    }

    filteredTableros = computed(() =>
        this.listaTableros()
            .filter((p) =>
                p.titulo?.toLowerCase().includes(this.search().toLowerCase())
            )
            .reverse()
    );

    getTableros() {
        this.#BoardService.getTableros(this.id).subscribe({
            next: (tableros) => {
                this.listaTableros.set(tableros);
            },
        });
    }

    estaOscuro(color: string): boolean {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);

        const iluminacion = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return iluminacion < 128;
    }

    addModalUsers() {
        const modalRef = this.#modalService.open(AddUsersModalComponent, {
            centered: true,
        });

        modalRef.componentInstance.idUser = this.user?._id;
        modalRef.componentInstance.idEspacioTrabajo = this.id;
        modalRef.componentInstance.espacioDeTrabajo = this.workSpaceDetail;

        return modalRef.result.catch(() => false);
    }

    modalTablero() {
        const modalRef = this.#modalService.open(AddTableroModalComponent, {
            centered: true,
        });

        modalRef.componentInstance.idUser = this.user?._id;
        modalRef.componentInstance.idEspacioTrabajo = this.id;
        modalRef.result.then((result) => {
            this.listaTableros.set([...this.listaTableros(), result]);
        });
    }

    modalOpcionesTablero(event: MouseEvent, tablero: Tablero) {
        event.preventDefault();
        const modalRef = this.#modalService.open(OptionsTableroModalComponent, {
            centered: true,
        });
        modalRef.componentInstance.tablero = tablero;
    }
}
