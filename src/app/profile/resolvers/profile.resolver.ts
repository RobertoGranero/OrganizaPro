import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { User } from '../../auth/interfaces/user';
import { ProfileService } from '../services/profile.service';

export const profileResolver: ResolveFn<User> = (route) => {
    const router = inject(Router)
    return inject(ProfileService)
        .getUser(route.params['id'])
        .pipe(
            catchError(() => {
                router.navigate(['/work-space']);
                return EMPTY;
            })
        );
};
