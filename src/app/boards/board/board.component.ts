import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    WritableSignal,
    inject,
    signal,
} from '@angular/core';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import { boardsService } from '../../services/boards-service';
import { Tablero } from '../../interfaces/tablero-interfaces';
import { CommonModule } from '@angular/common';

import { listService } from '../services/lista-service';
import { Lista, Tarjeta } from '../interfaces/lista-interfaces';
import {
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DndDropEvent, DndModule, EffectAllowed } from 'ngx-drag-drop';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailTarjetaModalComponent } from '../../modals/detail-tarjeta-modal/detail-tarjeta-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faListCheck, faPencil, faComment, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { tarjetaService } from '../../services/tarjetas-service';
import { RouterLink } from '@angular/router';
import { AutoanimateDirective } from '../../autoanimate.directive';

@Component({
    selector: 'board',
    standalone: true,
    imports: [
        TopMenuComponent,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DndModule,
        FontAwesomeModule,
        NgbTooltipModule,
        RouterLink,
        AutoanimateDirective
    ],
    templateUrl: './board.component.html',
    styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {

    @Input() id!: string;
    #boardService = inject(boardsService);
    board?: Tablero;
    listas: WritableSignal<Lista[]> = signal([]);
    titulosTarjetas: string[] = [];
    checkCountTrue: number = 0;
    @ViewChild('tituloLista') tituloLista!: ElementRef;

    showAddList: boolean = false;
    showAddCard: boolean = false;
    #listaService = inject(listService);
    #tarjetaService = inject(tarjetaService);

    #fb = inject(NonNullableFormBuilder);

    titulo = this.#fb.control('', [Validators.required]);

    formAddList = this.#fb.group({
        titulo: this.titulo,
    });


    #modalService = inject(NgbModal);
    icons = {faPencil, faListCheck, faComment, faTrash, faCircleXmark}

    draggable = {
        data: 'myDragData',
        effectAllowed: 'all' as EffectAllowed,
        disable: false,
        handle: false,
    };
    indexTarjeta: number | undefined = undefined;
    indexLista: number | undefined = undefined;

    ngOnInit(): void {
        this.titulosTarjetas = new Array(this.listas().length).fill('');
        this.getTablero();
        this.getListas();
    }

    getTablero() {
        this.#boardService.getTablero(this.id).subscribe({
            next: (boardItem) => {
                this.board = boardItem;
            },
        });
    }

    getListas() {
        this.#listaService.getListas(this.id).subscribe({
            next: (result) => {
                this.listas.set(result);


            },
        });
    }

    deleteLista(idLista: string){
        this.#listaService.deleteLista(idLista).subscribe({
            next: (resp) => {
                const listaNoBorradas = this.listas().filter((lista) => lista._id !== resp._id)
                this.listas.set(listaNoBorradas)
            }
        })
    }

    postLista() {
        const infoLista: Lista = {
            ...this.formAddList.getRawValue(),
            tablero: this.id,
            tarjetas: [],
        };

        this.#listaService.postListas(infoLista).subscribe({
            next: (result) => {
                this.listas.set([...this.listas(), result]);
                this.titulo.setValue('');
            },
        });
    }

    onEnterPressed(event: Event, id: string, index: number) {
        const tituloTarjeta = this.titulosTarjetas[index];

        const infoTarjeta: Tarjeta = {
            titulo: tituloTarjeta,
        };

        this.#tarjetaService.postTarjetas(id, infoTarjeta).subscribe({
            next: (resp) => {
                const indexLista = this.listas().findIndex(
                    (lista) => lista._id === id
                );
                this.listas()[indexLista].tarjetas.push(resp);
                event.preventDefault();
                this.titulosTarjetas[index] = '';
            },
        });
    }

    onDragStart(event: DragEvent, draggedObject: Tarjeta, indexLista: number) {
        const index = this.listas()[indexLista].tarjetas.findIndex(
            (l) => l._id === draggedObject._id
        );
        this.indexTarjeta = index;
        this.indexLista = indexLista;

    }

    

    onDrop(event: DndDropEvent, dropIndice: number) {
        if(dropIndice !== this.indexLista) {
            if (typeof this.indexTarjeta !== 'number') {
                return;
            }
            const draggedObject = this.listas()[this.indexLista!].tarjetas[this.indexTarjeta];
    
            this.#tarjetaService.dropTarjetaDeLista(this.listas()[dropIndice]._id!, draggedObject).subscribe({
                next: () => {
                    this.listas()[dropIndice].tarjetas.push(draggedObject);
                }
            }) 
    
            this.#tarjetaService.dragTarjetaDeLista(this.listas()[this.indexLista!]._id!, this.indexTarjeta!).subscribe({
                next: (result) => {
                    this.listas()[this.indexLista!].tarjetas = result
                }
            })
    
            this.indexTarjeta = undefined;
        }
        
    }
    onDropDelete(event: DndDropEvent) {

        if (typeof this.indexTarjeta !== 'number') {
            return;
        }
        const draggedObject = this.listas()[this.indexLista!].tarjetas[this.indexTarjeta];
        console.log(draggedObject)

        this.#tarjetaService.deleteTarjeta(this.listas()[this.indexLista!]._id!, draggedObject._id!).subscribe({
            next: () => {
                this.listas().forEach((resultado) => {
                    resultado.tarjetas.splice(this.indexTarjeta!, 1)
                })
            }
        })
       
        
    }

    putTituloLista(idLista: string){
        console.log(this.tituloLista.nativeElement.value)

        this.#listaService.putTituloLista(idLista, this.tituloLista.nativeElement.value).subscribe({
            next: (resp) => {
            }
        })
    }


    modalDetalleTarjeta(tarjeta: Tarjeta, listaTitulo: string, idLista: string) {
        const modalRef = this.#modalService.open(DetailTarjetaModalComponent, {
            centered: true,
        });
        modalRef.componentInstance.tarjeta = tarjeta;
        modalRef.componentInstance.listaTitulo = listaTitulo;
        modalRef.componentInstance.idLista = idLista;
        modalRef.componentInstance.idEspacioTrabajo = this.board?.espacioTrabajo;

        modalRef.result.then((resp) => {
            const indexTarjeta = resp as number;
            this.listas().forEach((resultado) => {
                resultado.tarjetas.splice(indexTarjeta, 1)
            })
        })

    }

}
