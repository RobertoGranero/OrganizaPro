import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarjeta } from '../../boards/interfaces/lista-interfaces';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tarjetaService } from '../../services/tarjetas-service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
    selector: 'detail-tarjeta-modal',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './detail-tarjeta-modal.component.html',
    styleUrl: './detail-tarjeta-modal.component.css',
})
export class DetailTarjetaModalComponent implements OnInit{

 

    #tarjetaService = inject(tarjetaService)
    activeModal = inject(NgbActiveModal);
    @Input() tarjeta?: Tarjeta;
    @Input() listaTitulo?: string;
    @Input() idLista?: string;
    showCheckList: boolean = false;
    check: boolean = false;
    showDescripcion!: boolean;
    #fb = inject(NonNullableFormBuilder);

    titulo = this.#fb.control('', [Validators.required]);
    fechaInicio = this.#fb.control('', [Validators.required]);
    fechaFin = this.#fb.control('', [Validators.required]);
    formCheckList = this.#fb.group({
        titulo: this.titulo,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
    });

    descripcion = this.#fb.control('', [Validators.required]);
    formDescripcion = this.#fb.group({
        descripcion: this.descripcion
    });

    ngOnInit(): void {
        console.log(this.tarjeta?.descripcion)
        this.showDescripcion = this.tarjeta?.descripcion ? true: false;
    }

    addCheckList(){
        
        this.#tarjetaService.postCheckListTarjeta(this.idLista!, this.formCheckList.getRawValue(), this.tarjeta?._id!).subscribe({
            next: (resp) => {
                this.tarjeta?.checkList?.push(this.formCheckList.getRawValue())
            }
        })
    }

    addDescripcion(){

        this.#tarjetaService.addDescripcion(this.idLista!, this.descripcion.value, this.tarjeta?._id!).subscribe({
            next: (resp) => {
                this.tarjeta!.descripcion = resp.descripcion;
                this.showDescripcion = true;
            }
        })
    }

/*     checkTarea(idCheck: string){
        this.check = !this.check
        this.#tarjetaService.checkTarea(this.idLista!, this.tarjeta?._id!, idCheck, this.check).subscribe({
            next: (resp) => {
                this.activeModal.update({})
            }
        })
    } */

}
