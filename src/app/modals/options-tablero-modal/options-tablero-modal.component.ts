import { Component, Input } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Tablero } from '../../interfaces/tablero-interfaces';

@Component({
    selector: 'options-tablero-modal',
    standalone: true,
    imports: [],
    templateUrl: './options-tablero-modal.component.html',
    styleUrl: './options-tablero-modal.component.css',
})
export class OptionsTableroModalComponent { 
    @Input() tablero! : Tablero; 
}
