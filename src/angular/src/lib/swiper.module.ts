import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper/swiper.component';
import { SwiperSlideComponent } from './swiper-slide/swiper-slide.component';
import { SwiperSlideContentDirective } from './swiper-slide/swiper-slide-template.directive';

@NgModule({
  declarations: [SwiperComponent, SwiperSlideComponent, SwiperSlideContentDirective],
  exports: [SwiperComponent, SwiperSlideComponent, SwiperSlideContentDirective],
  imports: [CommonModule],
})
export class SwiperModule {}
