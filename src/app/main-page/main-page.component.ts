import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Atropos from 'atropos';
import 'atropos/css';

@Component({
    selector: 'main-page',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit {
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
