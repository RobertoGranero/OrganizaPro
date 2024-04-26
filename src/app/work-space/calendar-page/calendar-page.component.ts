import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { TopMenuComponent } from '../../top-menu/top-menu.component';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

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
export class CalendarPageComponent {


    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locales: [esLocale],
        headerToolbar: {
            left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            center: 'title',
            right: 'prev,today,next',
        },
        weekends: false,
        events: [{ title: 'Meeting', start: Date.now()}],
    };
}
