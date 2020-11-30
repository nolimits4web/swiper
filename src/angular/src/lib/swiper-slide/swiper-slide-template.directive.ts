import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[swiper-slide-content]' })
export class SwiperSlideContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
