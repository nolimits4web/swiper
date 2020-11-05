import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'swiper-slide, [swiper-slide]',
  templateUrl: './swiper-slide.component.html',
  host: {
    class: 'swiper-slide',
  },
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      swiper-slide {
        display: block;
      }
    `,
  ],
})
export class SwiperSlideComponent {
  /** Template for step content. */
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;
  @Input() virtualIndex: number;
  constructor() {}
}
