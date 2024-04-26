import { Routes } from '@angular/router';

export const routesAuth: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth-page/auth-page.component').then((m) => m.AuthPageComponent),
    },

];