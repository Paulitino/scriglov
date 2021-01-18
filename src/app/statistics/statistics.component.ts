import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProfileService } from '../profile.service';
import { StatisticsService } from '../statistics.service';
import { HttpHandler } from '@angular/common/http';

@Component({
  selector: 'plotly-example',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public _mean;
  public _exercices;

  /**
   * Bars, track record and scores of exercices
  */

  view: any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Séance';
  showYAxisLabel = true;
  yAxisLabel = 'Score';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /**
   * Pie, hand in the right position
  */
  view_pie: any[] = [500, 300];
  showLabels_pie = true;
  explodeSlices_pie = false;
  doughnut_pie = false;
  showLegend_pie = true;

  colorScheme_pie = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /**
   * Circle progress, general data
   */
  view_circle: any[] = [700, 400];
  showXAxis_circle = true;
  showYAxis_circle = true;
  gradient_circle = false;
  showLegend_circle = true;
  showXAxisLabel_circle = true;
  xAxisLabel_circle = 'Séance';
  showYAxisLabel_circle = true;
  yAxisLabel_circle = 'Score';

  colorScheme_circle = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private profileService: ProfileService, private statisticsService: StatisticsService) {
    Object.assign(this);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {

    var id_token = JSON.parse(localStorage.getItem('id_token'));
    var id = JSON.parse(localStorage.getItem('id'));

    this.statisticsService.getStatistics(id, id_token, (res) => {
      if (res !== "error") {
        let i = 0;
        let total = 0;

        this._exercices = res.exercices;

        while (i < res.bestScores.length) {
          total = total + res.bestScores[i];
          i++;
        }
        console.log("a");
        this._mean = [
          {
            "name": "Main dans la bonne position",
            "value": total / i
          },
          {
            "name": "Main dans la mauvaise position",
            "value": 100 - (total / i)
          }
        ];
      }
    });
  }
}