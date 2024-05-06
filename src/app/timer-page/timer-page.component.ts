import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';

@Component({
    selector: 'timer-page',
    standalone: true,
    imports: [CommonModule, TopMenuComponent],
    templateUrl: './timer-page.component.html',
    styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    timer: any;
    date = new Date();

    show: boolean = true;
    disabled: boolean = false;
    animate: boolean = false;
    @ViewChild('idAudio') idAudio!: ElementRef;

    increment(type: 'H' | 'M' | 'S') {
        if (type === 'H') {
            if (this.hours >= 24) this.hours = 23;
            this.hours += 1;
        } else if (type === 'M') {
            if (this.minutes >= 59) this.minutes = 59;
            this.minutes += 1;
        } else {
            if (this.seconds >= 59) this.seconds = 59;
            this.seconds += 1;
        }
    }
    decrement(type: 'H' | 'M' | 'S') {
        if (type === 'H') {
            if (this.hours <= 0) return;
            this.hours -= 1;
        } else if (type === 'M') {
            if (this.minutes <= 0) this.minutes = 61;
            this.minutes -= 1;
        } else {
            if (this.seconds <= 0) this.seconds = 61;
            this.seconds -= 1;
        }
    }

    updateTimer() {
        this.date.setHours(this.hours);
        this.date.setMinutes(this.minutes);
        this.date.setSeconds(this.seconds);
        this.date.setMilliseconds(0);
        const time = this.date.getTime();
        this.date.setTime(time - 1000); //---

        this.hours = this.date.getHours();
        this.minutes = this.date.getMinutes();
        this.seconds = this.date.getSeconds();

        if (
            this.date.getHours() === 0 &&
            this.date.getMinutes() === 0 &&
            this.date.getSeconds() === 0
        ) {
            clearInterval(this.timer);
            this.idAudio.nativeElement.play();
            this.animate = true;
            setTimeout(() => {
                this.stop();
                this.idAudio.nativeElement.load();
            }, 5000);
        }
    }

    start() {
        if (this.hours > 0 || this.minutes > 0 || this.seconds > 0) {
            this.disabled = true;
            this.show = false; //hide btn + and -
            this.updateTimer();

            if (this.seconds > 0) {
                this.timer = setInterval(() => {
                    this.updateTimer();
                }, 1000);
            }
        }
    }

    stop() {
        this.disabled = false;
        this.show = true;
        this.animate = false;
        clearInterval(this.timer);
        this.idAudio.nativeElement.load();
    }

    reset() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.stop();
    }
}
