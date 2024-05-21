import { Routes } from '@angular/router';
import { logoutActivateGuard } from './guards/logout-activate.guard';
import { loginActivateGuard } from './guards/login-activate.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-page/main-page.component').then((m) => m.MainPageComponent),
    },
    {
        path: 'auth', canActivate: [logoutActivateGuard],
        loadChildren: () =>
        import('./auth/routes').then((m) => m.routesAuth),
    },
    {
        path: 'work-space', canActivate: [loginActivateGuard],
        loadChildren: () =>
        import('./work-space/routes').then((m) => m.workSpaceRoutes),
    },
    {
        path: 'timer', canActivate: [loginActivateGuard],
        loadComponent: () => import('./timer-page/timer-page.component').then((m) => m.TimerPageComponent),
        data: { animation: 'timerPage'}

    },
    {
        path: 'calendario/:id',
        loadComponent: () => import('./calendar-page/calendar-page.component').then((m) => m.CalendarPageComponent),
        data: { animation: 'calendarPage'}

    },
    {
        path: 'boards', canActivate: [loginActivateGuard],
        loadChildren: () =>
        import('./boards/routes').then((m) => m.boardsRoutes),
    },
    {
        path: 'profile', canActivate: [loginActivateGuard],
        loadChildren: () =>
        import('./profile/routes').then((m) => m.profileRoutes),
        data: { animation: 'profilePage'}
    },
    { path: '**', redirectTo: '' },
];
