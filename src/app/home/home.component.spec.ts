import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { WeatherService } from './services/weather.service';
import { of } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling'; 

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherServiceMock: any;

  beforeEach(async () => {
    weatherServiceMock = {
      getWeather: jasmine.createSpy('getWeather').and.returnValue(of({
        name: 'Bangalore',
        main: { temp: 30, humidity: 70 },
        weather: [{ icon: '01d', description: 'Clear sky' }],
        wind: { speed: 3.5 }
      })),
      getForecast: jasmine.createSpy('getForecast').and.returnValue(of({
        list: [{ main: { temp: 28 }, weather: [{ icon: '02d' }] }]
      })),
      getWeatherByCoords: jasmine.createSpy('getWeatherByCoords').and.returnValue(of({
        name: 'Bangalore',
        main: { temp: 30, humidity: 70 },
        weather: [{ icon: '01d', description: 'Clear sky' }],
        wind: { speed: 3.5 }
      })),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ScrollingModule],
      providers: [{ provide: WeatherService, useValue: weatherServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should fetch current weather on init', () => {
    spyOn(component, 'getCurrentLocation').and.callFake(() => component.fetchWeatherByCoords(12.9716, 77.5946));

    component.ngOnInit();
    fixture.detectChanges();

    expect(weatherServiceMock.getWeatherByCoords).toHaveBeenCalled();
    expect(component.currentWeather.name).toBe('Bangalore');
  });
});
