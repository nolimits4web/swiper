import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.component';
import { SwiperModule } from 'src/angular/src/public-api';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
];
@NgModule({
  imports: [CommonModule, SwiperModule, RouterModule.forChild(routes)],
  declarations: [HomePage],
})
export class HomeModule {}
