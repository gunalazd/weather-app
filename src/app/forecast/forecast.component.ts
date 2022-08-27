import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  weatherForecast: any;
  myChart = {};

  constructor(private ws: WeatherService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.ws.weatherForecast.subscribe((weatherForecast) => {
      this.weatherForecast = weatherForecast;

      console.log('weatherForecast : ', this.weatherForecast);

      let temp_max = this.weatherForecast.list.map((r: any) => r.main.temp_max);

      let dates = this.weatherForecast.list.map((r: any) => r.dt);

      let weatherDates: string[] = [];
      dates.forEach((res: any) => {
        let jsdate = new Date(res * 1000);
        weatherDates.push(
          jsdate.toLocaleTimeString('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        );
      });

      let canvas = document.getElementById('canvas') as HTMLCanvasElement;

      let ctx = canvas?.getContext('2d');

      let tempChart = Chart.getChart('canvas');

      if (tempChart) {
        tempChart.destroy();
      }

      if (ctx) {
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#FF2D00',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Temp °C',
                },
                suggestedMin: 0,
                suggestedMax: 40,
              },
            },
          },
        });
      }
    });
  }
}
