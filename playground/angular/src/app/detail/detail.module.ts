import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailPage } from './detail.component';
const routes: Routes = [
  {
    path: '',
    component: DetailPage,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [DetailPage],
})
export class DetailModule {}
