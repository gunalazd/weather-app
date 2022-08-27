import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  weatherInfo: any;

  constructor(private ws: WeatherService) {}

  ngOnInit(): void {
    this.ws.weatherInfo.subscribe((weatherInfo) => {
      this.weatherInfo = weatherInfo;
    });
  }
}
