import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Tablero } from '../../interfaces/tablero-interfaces';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { boardsService } from '../../services/boards-service';

@Component({
    selector: 'options-tablero-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './options-tablero-modal.component.html',
    styleUrl: './options-tablero-modal.component.css',
})
export class OptionsTableroModalComponent implements OnInit{

    @Input() tablero! : Tablero;
    #tableroService = inject(boardsService)
    showEditOption: boolean = false;
    showDeleteOption: boolean = false;
    #fb = inject(NonNullableFormBuilder);
    activeModal = inject(NgbActiveModal);

    titulo = this.#fb.control('', [Validators.required]);
    colorTablero = this.#fb.control('');

    formEditTablero = this.#fb.group({
        titulo: this.titulo,
        colorTablero: this.colorTablero
    });

    ngOnInit(): void {
        this.titulo.setValue(this.tablero.titulo)
        this.colorTablero.setValue(this.tablero.colorTablero)
    }

    editarTablero(){
        const infoEditTablero: Tablero = {
            ...this.formEditTablero.getRawValue()
        } 
        this.#tableroService.putTablero(this.tablero._id!, infoEditTablero).subscribe({
            next: (resp) => {
                this.tablero.colorTablero = infoEditTablero.colorTablero;
                this.tablero.titulo = infoEditTablero.titulo;
                this.activeModal.close(resp);

            }
        })
    }

    borrarTablero(){
        this.#tableroService.deleteTablero(this.tablero._id!).subscribe({
            next: (resp) => {
                this.activeModal.close(resp);
            }
        })
    }
}
