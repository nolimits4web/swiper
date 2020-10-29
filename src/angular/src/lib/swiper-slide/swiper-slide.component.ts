import { Component, Host, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';

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
export class SwiperSlideComponent implements OnInit {
  constructor(@Host() private parent: SwiperComponent) {}

  ngOnInit(): void {
    console.log('p', this.parent);
  }
}
