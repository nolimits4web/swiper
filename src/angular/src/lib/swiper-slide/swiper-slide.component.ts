import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'swiper-slide',
  templateUrl: './swiper-slide.component.html',
})
export class SwiperSlideComponent {
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;
  @ContentChild(TemplateRef, { read: TemplateRef }) template: TemplateRef<any>;
  @Input() virtualIndex: number;
  get classNames() {
    return this._classNames;
  }
  set classNames(val) {
    if (this._classNames === val) {
      return;
    }
    this._classNames = val;
    this.isActive =
      this.classNames.indexOf('swiper-slide-active') >= 0 ||
      this.classNames.indexOf('swiper-slide-duplicate-active') >= 0;
    this.isVisible = this.classNames.indexOf('swiper-slide-visible') >= 0;
    this.isDuplicate = this.classNames.indexOf('swiper-slide-duplicate') >= 0;
    this.isPrev =
      this.classNames.indexOf('swiper-slide-prev') >= 0 ||
      this.classNames.indexOf('swiper-slide-duplicate-prev') >= 0;
    this.isNext =
      this.classNames.indexOf('swiper-slide-next') >= 0 ||
      this.classNames.indexOf('swiper-slide-duplicate next') >= 0;
  }
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
  isVisible: boolean;
  isDuplicate: boolean;

  get slideData() {
    return {
      isActive: this.isActive,
      isPrev: this.isPrev,
      isNext: this.isNext,
      isVisible: this.isVisible,
      isDuplicate: this.isDuplicate,
    };
  }

  private _classNames: string = 'swiper-slide'; // TODO: get from parent settings
  constructor() {}
}
