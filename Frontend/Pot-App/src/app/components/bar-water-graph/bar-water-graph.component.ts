import { Component, OnInit, Input} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-water-graph',
  templateUrl: './bar-water-graph.component.html',
  styleUrls: ['./bar-water-graph.component.css']
})
export class BarWaterGraphComponent implements OnInit {
  @Input() parcel;
  constructor() { }

  myBarChart;

  ngOnInit(): void {
    this.myBarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        datasets: [{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [10, 20, 30, 40, 50, 60, 70]
        }]
      }
  });
    }

}
