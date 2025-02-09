import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  currentWeather: any;
  forecast: any[] = [];
  displayedForecast: any[] = [];
  city: string = 'Bangalore'; 
  error = '';
  loading: boolean = false;
  loadingMore: boolean = false;
  batchSize = 6;
  forecastIndex = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeatherByCoords(lat, lon);
        },
        () => {
          this.fetchWeather();
        }
      );
    } else {
      this.fetchWeather();
    }
  }

  fetchWeatherByCoords(lat: number, lon: number): void {
    this.loading = true; 
    this.weatherService.getWeatherByCoords(lat, lon).subscribe(
      (weather) => {
        this.currentWeather = weather;
        this.city = weather.name;
        this.error = '';
        this.fetchForecast();
      },
      () => {
        this.clearWeatherData('Location not found');
      }
    );
  }

  fetchWeather(): void {
    if (!this.city) this.city = 'Bangalore';

    this.loading = true;
    this.weatherService.getWeather(this.city).subscribe(
      (weather) => {
        this.currentWeather = weather;
        this.city = weather.name;
        this.error = '';
        this.loading = false;
        this.fetchForecast();
      },
      (error) => {
        this.loading = false;
        this.clearWeatherData(error.error?.message === 'Nothing to geocode' ? 'Please enter a valid city name' : 'City not found');
      }
    );
  }

  fetchForecast(): void {
    this.loading = true; 
    this.weatherService.getForecast(this.city).subscribe(
      (data) => {
        this.forecast = data.list || [];
        this.forecastIndex = 0;
        this.displayedForecast = this.forecast.slice(0, this.batchSize);
        this.loading = false;
      },
      () => {
        this.error = 'Unable to fetch forecast data';
        this.loading = false;
      }
    );
  }

  loadMoreForecast(): void {
    if (this.forecastIndex + this.batchSize >= this.forecast.length) return;

    this.loadingMore = true;
    setTimeout(() => {
      this.forecastIndex += this.batchSize;
      this.displayedForecast = [...this.displayedForecast, ...this.forecast.slice(this.forecastIndex, this.forecastIndex + this.batchSize)];
      this.loadingMore = false;
    }, 1000);
  }

  searchCity(event: any): void {
    const newCity = event.target.value.trim();
    if (newCity) {
      this.city = newCity;
      setTimeout(() => {
        this.virtualScroll?.scrollToIndex(0);
      }, 100);
      this.fetchWeather();
    } else {
      this.clearWeatherData('Please enter a valid city name');
    }
  }

  clearWeatherData(errorMessage: string): void {
    this.currentWeather = null;
    this.forecast = [];
    this.displayedForecast = [];
    this.error = errorMessage;
  }
}
