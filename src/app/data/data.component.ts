import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchmap';

@Component({
  selector: 'app-data',
  template: `
  <md-toolbar class="bar"><span><md-icon>home</md-icon></span></md-toolbar>


  <md-card class="card">
    <md-card-title>Basic D3 Line Chart</md-card-title>
    <md-card-subtitle>Line Chart</md-card-subtitle>
    <md-card-content>
      <app-chart [data]="data$$ | async"></app-chart>
    </md-card-content>
  </md-card>
  `,
  styles: [`
  .bar {
    background-color: #2196F3;
  }

  .card {
    margin: 5%;
  }
  `]
})
export class DataComponent implements OnInit {

  data: any;
  data$: Observable<any>;
  data$$: Observable<any>;

  constructor() { }

  ngOnInit() {

    this.data = [
     {
      "date": "2016-09-01T00:00:00Z",
      "total": 1300
     },
     {
      "date": "2016-10-01T00:00:00Z",
      "total": 1100
     },
     {
      "date": "2016-11-01T00:00:00Z",
      "total": 4100
     },
     {
      "date": "2016-12-01T00:00:00Z",
      "total": 500
     }
    ];


    this.data$$ = Observable
      .interval(3000)
      .switchMap(() => {

        let _data = [];

        this.data.forEach(function(d) {
          let _total = Math.floor(800 * Math.random());

          _data.push({ date: d.date,
                       total: _total });
        });

        return Observable.of(_data);
      });

    this.data$ = Observable.of(this.data);

  }

}
