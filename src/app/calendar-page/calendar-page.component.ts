import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { tarjetaService } from '../services/tarjetas-service';
import { CheckList } from '../boards/interfaces/lista-interfaces';

@Component({
    selector: 'calendar-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        ReactiveFormsModule,
        FullCalendarModule,
        TopMenuComponent,
    ],
    templateUrl: './calendar-page.component.html',
    styleUrl: './calendar-page.component.css',
})
export class CalendarPageComponent implements OnInit{


    @Input() id! : string;
    #tarjetaService = inject(tarjetaService)

    ngOnInit(): void {
        this.#tarjetaService.getCheckListDelUsuario(this.id).subscribe({
            next: (resp) => {
                const events = resp.map((resultado) => ({
                    title: resultado.titulo,
                    start: resultado.fechaInicio,
                    end: resultado.fechaFin,
                    id: resultado._id
                }));
                this.calendarOptions.events = events;


            }
        })

    }

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        locales: [esLocale],
        selectable: true,
        navLinks: true,
        headerToolbar: {
            left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            center: 'title',
            right: 'prev,today,next',
        },
        weekends: false,
        events: undefined,
    };


}
