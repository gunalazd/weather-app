import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  weatherInfo: any;
  weatherIconURL: string = '';
  safeSrc: SafeResourceUrl | undefined;

  constructor(private ws: WeatherService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.ws.weatherInfo.subscribe((weatherInfo: any) => {
      if (Object.entries(weatherInfo).length > 0) {
        this.weatherInfo = weatherInfo;
        this.weatherIconURL =
          'http://openweathermap.org/img/wn/' +
          weatherInfo.weather[0].icon +
          '@4x.png';

        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://maps.google.com/maps?q=' +
            weatherInfo.name +
            '&z=7&ie=UTF8&output=embed'
        );
      }
    });
  }
}
