import { Routes } from '@angular/router';

export const workSpaceRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./work-space-page/work-space-page.component').then((m) => m.WorkSpacePageComponent),
    },
    {
        path: 'calendario',
        loadComponent: () => import('./calendar-page/calendar-page.component').then((m) => m.CalendarPageComponent),
    },

    {
        path: ':id',
        loadComponent: () => import('./work-space-detail/work-space-detail.component').then((m) => m.WorkSpaceDetailComponent),
    }

];