import {
  Component,
  ContentChild,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SwiperSlideContentDirective } from './swiper-slide-template.directive';

@Component({
  selector: 'swiper-slide',
  templateUrl: './swiper-slide.component.html',
})
export class SwiperSlideComponent {
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;
  @ContentChild(SwiperSlideContentDirective, { read: TemplateRef }) template: TemplateRef<any>;
  @Input() virtualIndex: number;
  get classNames() {
    return this._classNames;
  }
  set classNames(val) {
    if (this._classNames === val) {
      return;
    }
    this._classNames = val;
    this.slideData.isActive =
      this.classNames.indexOf('swiper-slide-active') >= 0 ||
      this.classNames.indexOf('swiper-slide-duplicate-active') >= 0;
    this.slideData.isVisible = this.classNames.indexOf('swiper-slide-visible') >= 0;
    this.slideData.isDuplicate = this.classNames.indexOf('swiper-slide-duplicate') >= 0;
    this.slideData.isPrev =
      this.classNames.indexOf('swiper-slide-prev') >= 0 ||
      this.classNames.indexOf('swiper-slide-duplicate-prev') >= 0;
    this.slideData.isNext =
      this.classNames.indexOf('swiper-slide-next') >= 0 ||
      this.classNames.indexOf('swiper-slide-duplicate next') >= 0;
  }
  slideData = {
    isActive: false,
    isPrev: false,
    isNext: false,
    isVisible: false,
    isDuplicate: false,
  };

  private _classNames: string = 'swiper-slide'; // TODO: get from parent settings
  constructor() {}
}
