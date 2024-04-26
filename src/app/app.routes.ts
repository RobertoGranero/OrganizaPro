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
        path: 'boards', canActivate: [loginActivateGuard],
        loadChildren: () =>
        import('./boards/routes').then((m) => m.boardsRoutes),
    },
    {
        path: 'profile', canActivate: [loginActivateGuard],
        loadChildren: () =>
        import('./profile/routes').then((m) => m.profileRoutes),
    },
    { path: '**', redirectTo: '' },
];
