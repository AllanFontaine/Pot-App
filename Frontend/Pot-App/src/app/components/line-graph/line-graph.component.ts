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

  @Input() parcel;

  constructor(private garden: PersonalGardenService, private datePipe: DatePipe) { }

  LineChart;
  labels = [];
  soil_moisture_data = [];
  exterior_moisture_data = [];
  exterior_temp_data = [];

  onClickUpdate(numberOfDays: number) {
    this.labels = [];
    this.soil_moisture_data = [];
    this.exterior_moisture_data = [];
    this.exterior_temp_data = [];
    let currentDate = new Date;
    currentDate.setDate(currentDate.getDate() - numberOfDays);

    this.garden.get_parcel_data(this.parcel, currentDate.toISOString()).subscribe(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          this.soil_moisture_data.push(res[i].humidite_sol);
        }
        this.updateLineChart();
      },
      (err) => console.log(err)

    );
    this.garden.get_user_data(currentDate.toISOString()).subscribe(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          this.labels.push(this.datePipe.transform(res[i].date_reception_donnee, 'd/M/yy H:mm'));
          this.exterior_moisture_data.push(res[i].humidite_exterieur);
          this.exterior_temp_data.push(res[i].temperature_exterieur);
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
      data: this.soil_moisture_data,
      fill: false,
      lineTension: 0.2,
      borderColor: "green",
      borderWidth: 1
    }, {
      label: 'Température extérieure',
      data: this.exterior_temp_data,
      fill: false,
      lineTension: 0.2,
      borderColor: "red",
      borderWidth: 1
    }, {
      label: 'Humidité extérieure',
      data: this.exterior_moisture_data,
      fill: false,
      lineTension: 0.2,
      borderColor: "blue",
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
        }, {
          label: 'Température extérieure',
          fill: false,
          lineTension: 0.2,
          borderColor: "red",
          borderWidth: 1
        }, {
          label: 'Humidité extérieure',
          fill: false,
          lineTension: 0.2,
          borderColor: "blue",
          borderWidth: 1
        }],
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          text: 'Mon graphique de mon jardin',
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
    window.screen.orientation.lock("landscape-primary")
    this.onClickUpdate(1);

  }

}
