import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faXTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Atropos from 'atropos';
import 'atropos/css';
@Component({
    selector: 'main-page',
    standalone: true,
    imports: [RouterLink, CommonModule, RouterLinkActive, FormsModule, FontAwesomeModule],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit, OnInit {
    icons = { faGoogle, faXTwitter, faFacebook, faInstagram}
    ngOnInit(): void {

    }
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
