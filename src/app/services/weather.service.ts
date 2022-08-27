import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private myAPIkey = 'eeacf27285660e2430921e791c1b719f';

  weatherInfo = new BehaviorSubject<{}>({});
  castWeather = this.weatherInfo.asObservable;

  weatherForecast = new BehaviorSubject<{}>({});
  castForecast = this.weatherForecast.asObservable;

  currentCity = 'Malaga';
  lat = 0;
  lon = 0;

  constructor(private http: HttpClient) {}

  getWeatherData(city: string) {
    this.currentCity = city;
    return this.http
      .get(
        'http://api.openweathermap.org/geo/1.0/direct?q=' +
          city +
          '&limit=1&appid=' +
          this.myAPIkey
      )
      .subscribe((a: any) => {
        this.lat = a[0].lat;
        this.lon = a[0].lon;
        this.getCurrentWeather(this.lat, this.lon);
        this.getForecaset(this.lat, this.lon);
      });
  }

  getCurrentWeather(lat: number, lon: number) {
    return this.http
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
          lat +
          '&lon=' +
          lon +
          '&units=metric' +
          '&appid=' +
          this.myAPIkey
      )
      .subscribe((a) => {
        console.log('getCurrent : ', a);
        this.weatherInfo.next(a);
      });
  }

  getForecaset(lat: number, lon: number) {
    return this.http
      .get(
        'http://api.openweathermap.org/data/2.5/forecast?lat=' +
          lat +
          '&lon=' +
          lon +
          '&units=metric&appid=' +
          this.myAPIkey
      )
      .subscribe((a) => {
        console.log('getForecaset : ', a);
        this.weatherForecast.next(a);
      });
  }
}
