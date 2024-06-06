import { Component, EventEmitter, Input, Output, WritableSignal, inject, signal } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Tablero } from '../../interfaces/tablero-interfaces';
import { boardsService } from '../../services/boards-service';

@Component({
    selector: 'add-tablero-modal',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './add-tablero-modal.component.html',
    styleUrl: './add-tablero-modal.component.css',
})
export class AddTableroModalComponent {
    @Input() title!: string;
    @Input() idUser?: string;
    @Input() idEspacioTrabajo?: string;
    @Output() workSpace: EventEmitter<any> = new EventEmitter();

    activeModal = inject(NgbActiveModal);
    #BoardService = inject(boardsService);
    #fb = inject(NonNullableFormBuilder);

    titulo = this.#fb.control('', [Validators.required]);
    colorTablero = this.#fb.control('#000000', [Validators.required]);
    formAddTablero = this.#fb.group({
        titulo: this.titulo,
        colorTablero: this.colorTablero,
    });

    addTablero() {
        const tableroInfo: Tablero = {
            ...this.formAddTablero.getRawValue(),
            creadoPor: this.idUser!,
            espacioTrabajo: this.idEspacioTrabajo!,
        };
        this.#BoardService.postTablero(tableroInfo).subscribe({
            next: (result) => {
                this.activeModal.close(result);
            },
        });
    }


}
