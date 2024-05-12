import { Directive, ElementRef, Input } from '@angular/core';
import autoAnimate, { AutoAnimateOptions, AutoAnimationPlugin } from '@formkit/auto-animate';
import { AutoAnimateModule } from '@formkit/auto-animate/angular'

@Directive({
  selector: '[autoanimate]',
  standalone: true
})
export class AutoanimateDirective {

  @Input() options: Partial<AutoAnimateOptions> | AutoAnimationPlugin = {};

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    autoAnimate(this.el.nativeElement, this.options);
  }

}
