import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faXTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faChessBoard, faList, faClipboardList, faDesktop } from '@fortawesome/free-solid-svg-icons';
import Atropos from 'atropos';
import 'atropos/css';
@Component({
    selector: 'main-page',
    standalone: true,
    imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule, FontAwesomeModule],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit{
    icons = { faGoogle, faXTwitter, faFacebook, faInstagram, faChessBoard, faList, faClipboardList, faDesktop }

    ngAfterViewInit(): void {
        const myAtropos = Atropos({
            el: '.my-atropos',
            activeOffset: 40,
            shadowScale: 1.05,
            shadow: false,
            highlight: false,
        });

    }

}
