import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private myAPIkey = 'eeacf27285660e2430921e791c1b719f';
  private myAPIkey_IP_lookup = '0d31fd36d59a8da4732551c0735605e1';

  weatherInfo = new BehaviorSubject<{}>({});
  castWeather = this.weatherInfo.asObservable;

  weatherForecast = new BehaviorSubject<{}>({});
  castForecast = this.weatherForecast.asObservable;

  constructor(private http: HttpClient) {}

  getWeatherData(city: string) {
    return this.http
      .get(
        'http://api.openweathermap.org/geo/1.0/direct?q=' +
          city +
          '&limit=1&appid=' +
          this.myAPIkey
      )
      .subscribe((a: any) => {
        this.getCurrentWeather(a[0].lat, a[0].lon);
        this.getForecaset(a[0].lat, a[0].lon);
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

  getUserLocation() {
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
}
