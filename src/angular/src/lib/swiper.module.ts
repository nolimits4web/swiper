import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper/swiper.component';
import { SwiperSlideComponent } from './swiper-slide/swiper-slide.component';

@NgModule({
  declarations: [SwiperComponent, SwiperSlideComponent],
  exports: [SwiperComponent, SwiperSlideComponent],
  imports: [CommonModule],
})
export class SwiperModule {}
