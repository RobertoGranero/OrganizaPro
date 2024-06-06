import { Component, Input, OnChanges, OnInit, computed, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faGear, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
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
import { FormsModule } from '@angular/forms';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
    selector: 'top-menu',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterLink,
        NgbDropdownModule,
        AvatarModule,
        RouterLinkActive,
        FormsModule
    ],
    templateUrl: './top-menu.component.html',
    styleUrl: './top-menu.component.css',
})
export class TopMenuComponent implements OnInit, OnChanges{


    #UserService = inject(UsersService);

    @Input() avatarProfile?: string;
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
        faMoon,
        faSun
    };
    user?: User;

    #authService = inject(AuthService);
    #profileService = inject(ProfileService);
    cookieService = inject(SsrCookieService);
    darkmode = false;
    logged = computed(() => this.#authService.logged());

    ngOnInit(): void {
        this.darkmode = sessionStorage.getItem('data-theme') === 'dark' ? true : false;
        document.documentElement.setAttribute('data-theme', sessionStorage.getItem('data-theme')!)
        this.userLogged()
    }
    ngOnChanges(): void {
        if(this.user?.avatar) this.user.avatar = this.avatarProfile

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
    changeTheme(){
        this.darkmode = !this.darkmode; 
        sessionStorage.setItem('data-theme', this.darkmode ? 'dark' : 'ligth')
        document.documentElement.setAttribute('data-theme', sessionStorage.getItem('data-theme')!)
    }
}
