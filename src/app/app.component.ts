import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private ws: WeatherService) {}

  ngOnInit(): void {
    this.ws.getWeatherData(this.ws.currentCity);
  }

  title = 'weather-app';

  getWeatherData(cityName: string) {
    this.ws.getWeatherData(cityName);
  }
}
