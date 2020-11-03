import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

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
  @Input() virtualIndex: number;
  constructor() {}
}
