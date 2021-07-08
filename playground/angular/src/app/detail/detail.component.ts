import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
})
export class DetailPage {
  readonly id$ = this.route.paramMap.pipe(map((params) => params.get('id')));
  constructor(private readonly route: ActivatedRoute) {}
}
