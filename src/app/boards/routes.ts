import { Routes } from '@angular/router';

export const boardsRoutes: Routes = [
    {
        path: ':id',
        loadComponent: () => import('./board/board.component').then((m) => m.BoardComponent),
        data: { animation: 'boardPage'}
    }

];