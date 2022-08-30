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
    this.ws.weatherInfo.subscribe((weatherInfo) => {
      this.weatherInfo = weatherInfo;
      this.getWeatherIcon();
    });
  }

  getWeatherIcon() {
    let code = this.weatherInfo.weather[0].icon;
    this.weatherIconURL =
      'http://openweathermap.org/img/wn/' + code + '@4x.png';
  }
}
