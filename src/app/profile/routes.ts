import { Routes } from '@angular/router';
import { profileResolver } from './resolvers/profile.resolver';

export const profileRoutes: Routes = [
    {
        path: ':id', resolve: {profile: profileResolver},
        loadComponent: () => import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
    },
    { path: '**', redirectTo: ':id' },

];