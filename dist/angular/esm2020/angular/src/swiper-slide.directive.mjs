import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from './utils/utils';
import * as i0 from "@angular/core";
export class SwiperSlideDirective {
    constructor(template) {
        this.template = template;
        this.class = '';
        this.autoplayDelay = null;
        this.slideData = {
            isActive: false,
            isPrev: false,
            isNext: false,
            isVisible: false,
            isDuplicate: false,
        };
    }
    set ngClass(val) {
        this.class = [this.class || '', val].join(' ');
    }
    set zoom(val) {
        this._zoom = coerceBooleanProperty(val);
    }
    get zoom() {
        return this._zoom;
    }
    get classNames() {
        return this._classNames;
    }
    set classNames(val) {
        if (this._classNames === val) {
            return;
        }
        this._classNames = val;
        this.slideData = {
            isActive: this._hasClass(['swiper-slide-active', 'swiper-slide-duplicate-active']),
            isVisible: this._hasClass(['swiper-slide-visible']),
            isDuplicate: this._hasClass(['swiper-slide-duplicate']),
            isPrev: this._hasClass(['swiper-slide-prev', 'swiper-slide-duplicate-prev']),
            isNext: this._hasClass(['swiper-slide-next', 'swiper-slide-duplicate-next']),
        };
    }
    _hasClass(classNames) {
        return classNames.some((className) => this._classNames.indexOf(className) >= 0);
    }
}
SwiperSlideDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: SwiperSlideDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
SwiperSlideDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.2", type: SwiperSlideDirective, selector: "ng-template[swiperSlide]", inputs: { virtualIndex: "virtualIndex", class: "class", ngClass: "ngClass", autoplayDelay: ["data-swiper-autoplay", "autoplayDelay"], zoom: "zoom" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: SwiperSlideDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[swiperSlide]',
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { virtualIndex: [{
                type: Input
            }], class: [{
                type: Input
            }], ngClass: [{
                type: Input
            }], autoplayDelay: [{
                type: Input,
                args: ['data-swiper-autoplay']
            }], zoom: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLXNsaWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXItc2xpZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJdEQsTUFBTSxPQUFPLG9CQUFvQjtJQThDL0IsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUE1Q3BDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFLRyxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUE4Qm5FLGNBQVMsR0FBRztZQUNWLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7SUFHOEMsQ0FBQztJQTNDakQsSUFDSSxPQUFPLENBQUMsR0FBVztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUNJLElBQUksQ0FBQyxHQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBR0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFJLFVBQVUsQ0FBQyxHQUFHO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxHQUFHLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMscUJBQXFCLEVBQUUsK0JBQStCLENBQUMsQ0FBQztZQUNsRixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDbkQsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztZQUM1RSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLDZCQUE2QixDQUFDLENBQUM7U0FDN0UsQ0FBQztJQUNKLENBQUM7SUFFTyxTQUFTLENBQUMsVUFBb0I7UUFDcEMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDOztpSEFwQ1Usb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFIaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2lCQUNyQztrR0FFVSxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFFRixPQUFPO3NCQURWLEtBQUs7Z0JBSXlCLGFBQWE7c0JBQTNDLEtBQUs7dUJBQUMsc0JBQXNCO2dCQUV6QixJQUFJO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtzd2lwZXJTbGlkZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBTd2lwZXJTbGlkZURpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHZpcnR1YWxJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBjbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIHNldCBuZ0NsYXNzKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5jbGFzcyA9IFt0aGlzLmNsYXNzIHx8ICcnLCB2YWxdLmpvaW4oJyAnKTtcbiAgfVxuICBASW5wdXQoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JykgYXV0b3BsYXlEZWxheTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpXG4gIHNldCB6b29tKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuX3pvb20gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgem9vbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fem9vbTtcbiAgfVxuICBwcml2YXRlIF96b29tOiBib29sZWFuO1xuICBzbGlkZUluZGV4OiBudW1iZXI7XG4gIGdldCBjbGFzc05hbWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc05hbWVzO1xuICB9XG4gIHNldCBjbGFzc05hbWVzKHZhbCkge1xuICAgIGlmICh0aGlzLl9jbGFzc05hbWVzID09PSB2YWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2xhc3NOYW1lcyA9IHZhbDtcbiAgICB0aGlzLnNsaWRlRGF0YSA9IHtcbiAgICAgIGlzQWN0aXZlOiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1hY3RpdmUnLCAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1hY3RpdmUnXSksXG4gICAgICBpc1Zpc2libGU6IHRoaXMuX2hhc0NsYXNzKFsnc3dpcGVyLXNsaWRlLXZpc2libGUnXSksXG4gICAgICBpc0R1cGxpY2F0ZTogdGhpcy5faGFzQ2xhc3MoWydzd2lwZXItc2xpZGUtZHVwbGljYXRlJ10pLFxuICAgICAgaXNQcmV2OiB0aGlzLl9oYXNDbGFzcyhbJ3N3aXBlci1zbGlkZS1wcmV2JywgJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtcHJldiddKSxcbiAgICAgIGlzTmV4dDogdGhpcy5faGFzQ2xhc3MoWydzd2lwZXItc2xpZGUtbmV4dCcsICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnXSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0NsYXNzKGNsYXNzTmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGNsYXNzTmFtZXMuc29tZSgoY2xhc3NOYW1lKSA9PiB0aGlzLl9jbGFzc05hbWVzLmluZGV4T2YoY2xhc3NOYW1lKSA+PSAwKTtcbiAgfVxuICBzbGlkZURhdGEgPSB7XG4gICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIGlzUHJldjogZmFsc2UsXG4gICAgaXNOZXh0OiBmYWxzZSxcbiAgICBpc1Zpc2libGU6IGZhbHNlLFxuICAgIGlzRHVwbGljYXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcml2YXRlIF9jbGFzc05hbWVzOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cbiJdfQ==