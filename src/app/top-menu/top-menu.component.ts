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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatars';
import { User } from '../auth/interfaces/user';
import { UsersService } from '../users/users.service';
import { ProfileService } from '../profile/services/profile.service';

@Component({
    selector: 'top-menu',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterLink,
        NgbDropdownModule,
        AvatarModule,
        RouterLinkActive
    ],
    templateUrl: './top-menu.component.html',
    styleUrl: './top-menu.component.css',
})
export class TopMenuComponent implements OnInit{


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
    user?: User;

    #authService = inject(AuthService);
    #profileService = inject(ProfileService);

    logged = computed(() => this.#authService.logged());
    ngOnInit(): void {
        
        this.userLogged()
    }
    logout() {
        this.#authService.logout();
    }

    userLogged() {
        this.#UserService.getUsuarioLogueado().subscribe({
            next: (userInfo) => {
                this.user = userInfo
                this.getAvatar()

            },
        });
    }

    getAvatar() {
        this.#profileService.getUser(this.user?._id!).subscribe({
            next: (value) => {
                this.user!.avatar = value.avatar;
            },
        });
    }
}
