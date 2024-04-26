import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatars';
import { User } from '../auth/interfaces/user';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'top-menu',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterLink,
        NgbDropdownModule,
        AvatarModule,
    ],
    templateUrl: './top-menu.component.html',
    styleUrl: './top-menu.component.css',
})
export class TopMenuComponent implements OnInit{
    ngOnInit(): void {
        this.userLogged()
    }

    #UserService = inject(UsersService);

    //@Input() user!: User;
    toggleExpand: boolean = false;
    icons = {
        faMagnifyingGlass,
        faUsersRectangle,
        faBars,
        faClockRotateLeft,
        faMessage,
        faCalendar,
        faGear,
        faArrowRightFromBracket,
    };
    user!: User;

    #authService = inject(AuthService);
    logged = computed(() => this.#authService.logged());

    logout() {
        this.#authService.logout();
    }

    userLogged() {
        this.#UserService.idUsuarioLogueado().subscribe({
            next: (userInfo) => {
                this.user = userInfo
            },
        });
    }
}
