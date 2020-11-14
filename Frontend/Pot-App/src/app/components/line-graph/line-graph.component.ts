import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {

  @Input() parcel
  constructor(private garden: PersonalGardenService, private datePipe: DatePipe) { }

  LineChart;
  labels = [];
  data = [];

  onClickUpdate(numberOfDays: number) {
    this.labels = [];
    this.data = [];
    let currentDate = new Date;
    currentDate.setDate(currentDate.getDate() - numberOfDays);

    this.garden.get_parcel_data(this.parcel, currentDate.toISOString()).subscribe(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          this.labels.push(this.datePipe.transform(res[i].date_reception_donnee, 'd/M/yy H:mm'));
          this.data.push(res[i].humidite_sol);
        }
        this.updateLineChart();
      },
      (err) => console.log(err)
    );


  }

  updateLineChart() {
    this.LineChart.data.labels = this.labels;
    this.LineChart.data.datasets = [{
      label: 'Humidité de la parcelle',
      data: this.data,
      fill: false,
      lineTension: 0.2,
      borderColor: "green",
      borderWidth: 1
    }]
    this.LineChart.update();
  }
  ngOnInit(): void {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Humidité de la parcelle',
          fill: false,
          lineTension: 0.2,
          borderColor: "green",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Humdité de la parcelle en fonction du temps en %",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 100
            }
          }]
        }
      }
    });
    this.onClickUpdate(1);
  }

}
