import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  const mockWeatherData = { name: 'Bangalore', main: { temp: 30 }, weather: [{ description: 'Clear sky', icon: '01d' }] };
  const mockForecastData = { list: [{ dt: 123, main: { temp: 28 }, weather: [{ icon: '02d' }] }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch current weather', () => {
    service.getWeather('Bangalore').subscribe(data => {
      expect(data.name).toEqual('Bangalore');
      expect(data.main.temp).toBe(30);
    });

    const req = httpMock.expectOne(req => req.url.includes('Bangalore'));
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should fetch weather by coordinates', () => {
    service.getWeatherByCoords(12.97, 77.59).subscribe(data => {
      expect(data.name).toEqual('Bangalore');
    });

    const req = httpMock.expectOne(req => req.url.includes('lat=12.97&lon=77.59'));
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should fetch forecast', () => {
    service.getForecast('Bangalore').subscribe(data => {
      expect(data.list.length).toBe(1);
      expect(data.list[0].main.temp).toBe(28);
    });

    const req = httpMock.expectOne(req => req.url.includes('forecast'));
    expect(req.request.method).toBe('GET');
    req.flush(mockForecastData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
