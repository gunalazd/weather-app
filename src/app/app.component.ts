import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('cityToLookFor') city!: ElementRef;

  constructor(private ws: WeatherService) {}

  ngOnInit(): void {
    this.ws.getUserGeolocation();
  }

  title = 'weather-app';

  getWeatherData(cityName: string) {
    this.ws.getWeatherData(cityName);
    this.city.nativeElement.value = '';
  }
}
