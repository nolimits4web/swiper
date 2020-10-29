import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from '../../../build/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';
  constructor() {
    // SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  }
  ngOnInit() {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  }
  test(string) {
    console.log(string);
  }
}
