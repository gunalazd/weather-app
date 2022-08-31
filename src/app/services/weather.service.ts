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

  constructor(private http: HttpClient) {}

  getUserGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getCurrentWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        this.getForecaset(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  getWeatherData(city: string) {
    return this.http
      .get(
        'http://api.openweathermap.org/geo/1.0/direct?q=' +
          city +
          '&limit=1&appid=' +
          this.myAPIkey
      )
      .subscribe((a: any) => {
        if (a[0]?.lat) {
          this.getCurrentWeather(a[0].lat, a[0].lon);
          this.getForecaset(a[0].lat, a[0].lon);
        } else {
          alert('Invalid city name');
        }
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
        this.weatherForecast.next(a);
      });
  }
}
