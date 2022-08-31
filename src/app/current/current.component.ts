import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  weatherInfo: any;
  weatherIconURL: string = '';

  constructor(private ws: WeatherService) {}

  ngOnInit(): void {
    this.ws.weatherInfo.subscribe((weatherInfo: any) => {
      if (Object.entries(weatherInfo).length > 0) {
        this.weatherInfo = weatherInfo;
        this.weatherIconURL =
          'http://openweathermap.org/img/wn/' +
          weatherInfo.weather[0].icon +
          '@4x.png';
      }
    });
  }
}
