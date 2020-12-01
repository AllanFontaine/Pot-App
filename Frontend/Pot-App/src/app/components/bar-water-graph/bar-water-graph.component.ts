import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { PersonalGardenService } from '../../service/personal-garden.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bar-water-graph',
  templateUrl: './bar-water-graph.component.html',
  styleUrls: ['./bar-water-graph.component.css']
})
export class BarWaterGraphComponent implements OnInit {
  @Input() parcel;

  constructor(private garden: PersonalGardenService, private datePipe: DatePipe) { }

  myBarChart;

  labels = [];
  water_amount_data = [];
  onGraphChange() {
    this.labels = [];

    let dataDate = new Date;
    dataDate.setDate(dataDate.getDate() - 7);

    this.garden.get_parcel_data(this.parcel, dataDate.toISOString()).subscribe(
      (res) => {
        console.log((dataDate.setDate(dataDate.getDate() + 15)) + '')
        console.log(dataDate)
        let dayOne = 0, dayTwo = 0, dayThree = 0, dayFour = 0, dayFive = 0, daySix = 0, daySeven = 0;
        for (let data of res) {
          console.log(data)
          switch (this.datePipe.transform(data.date_reception_donnee, 'd')) {

            case (this.getDateDays(0) + ''):
              daySeven += parseFloat(data.quantite_eau_litre);
              break;
            case (this.getDateDays(1) + ''):
              daySix += parseFloat(data.quantite_eau_litre);
              break;
            case (this.getDateDays(2) + ''):
              dayFive += parseFloat(data.quantite_eau_litre);
              break;
            case (this.getDateDays(3) + ''):
              dayFour += parseFloat(data.quantite_eau_litre);
              break;
            case (this.getDateDays(4) + ''):
              dayThree += parseFloat(data.quantite_eau_litre);
              break;
            case (this.getDateDays(5) + ''):
              dayTwo += parseFloat(data.quantite_eau_litre);
              break;
            case (this.getDateDays(6) + ''):
              dayOne += parseFloat(data.quantite_eau_litre);
              break;
          }
        }
        console.log(daySeven)
        this.water_amount_data.push(dayOne)
        this.water_amount_data.push(dayTwo)
        this.water_amount_data.push(dayThree)
        this.water_amount_data.push(dayFour)
        this.water_amount_data.push(dayFive)
        this.water_amount_data.push(daySix)
        this.water_amount_data.push(daySeven)
        let currentDate = new Date;
        currentDate.setDate(currentDate.getDate() - 7);
        for (let i = 0; i < 6; i++) {
          this.labels.push(this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'EEEE, d/M/yy'));
        }
        this.labels.push('Aujourd\'hui, ' + this.datePipe.transform(currentDate.setDate(currentDate.getDate() + 1), 'd/M/yy'))

        this.updateBarChart();
      },
      (err) => console.log(err)

    );




  }

  getDateDays(numberDays: number): number {
    let today = new Date()
    today.setDate(today.getDate() - numberDays)
    return today.getDate()

  }
  updateBarChart() {
    this.myBarChart.data.labels = this.labels
    this.myBarChart.data.datasets = [{
      label: 'Quantité d\'eau en fonction du jour',
      data: this.water_amount_data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderWidth: 1
    }]
    this.myBarChart.update();
  }
  ngOnInit(): void {
    this.myBarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
          label: 'Quantité d\'eau en fonction du jour',
          data: [12, 19, 3, 5, 2, 3, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.onGraphChange()
  }


}
