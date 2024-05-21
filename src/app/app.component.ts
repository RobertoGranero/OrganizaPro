import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, group, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  animations: [
    trigger('routeAnimation', [
      transition('workSpacePage => workSpacePage-detail', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('0.4s', style({ transform: 'translateX(-100%)' })),
            animate('0.2s', style({ opacity: 0 }))
          ]),
          query(':enter', [animate('0.5s', style({ transform: 'none' }))]),
        ]),
      ]),
      transition('workSpacePage-detail => workSpacePage', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('0.4s', style({ transform: 'translateX(100%)' })),
            animate('0.2s', style({ opacity: 0 }))
          ]),
          query(':enter', [animate('0.5s', style({ transform: 'none' }))]),
        ]),
      ]),
      transition('workSpacePage-detail => boardPage', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'scale(0.5) translateX(100%)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-in-out', style({ opacity: 0, transform: 'scale(1.5) translateX(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease-in-out', style({ opacity: 1, transform: 'scale(1) translateX(0)' }))
          ], { optional: true }),
        ]),
      ]),
      transition('boardPage => workSpacePage-detail', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'scale(1.5) translateX(-100%)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-in-out', style({ opacity: 0, transform: 'scale(0.5) translateX(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease-in-out', style({ opacity: 1, transform: 'scale(1) translateX(0)' }))
          ], { optional: true }),
        ]),
      ]),

      transition('* => timerPage', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'translateY(-100%)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-in-out', style({ opacity: 0, transform: 'translateY(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ]),
      ]),
      transition('timerPage => *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'translateY(100%)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-in-out', style({ opacity: 0, transform: 'translateY(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ]),
      ]),
      transition('* => calendarPage', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'translateY(-100%)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-in-out', style({ opacity: 0, transform: 'translateY(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ]),
      ]),
      transition('calendarPage => *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'translateY(100%)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-in-out', style({ opacity: 0, transform: 'translateY(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ]),
      ]),

      transition('* => profilePage', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'translateY(20px)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.4s ease-in-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.4s 0.2s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ]),
      ]),
      transition('profilePage => *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%' }), { optional: true }),
        query(':enter', style({ opacity: 0, transform: 'translateY(-20px)' }), { optional: true }),
        group([
          query(':leave', [
            animate('0.4s ease-in-out', style({ opacity: 0, transform: 'translateY(20px)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.4s 0.2s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true }),
        ]),
      ]),

    ]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'organizaPro';
  getState(routerOutlet: RouterOutlet) {
    return routerOutlet.activatedRouteData['animation'] || 'None';
  }
}
