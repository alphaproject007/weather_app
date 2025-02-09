import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '88cded81ee4a460b96b7ffff72139a7f';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.weatherUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
  
  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  getForecastByCoords(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
  }
}
