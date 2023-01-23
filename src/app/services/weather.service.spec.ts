import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Weather } from '../interfaces/weather';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return weather data', () => {
    const mockWeather: Weather = {
      coord: {
        lon: 20.3733,
        lat: 47.9026,
      },
      weather: [
        {
          id: 600,
          main: 'Snow',
          description: 'enyhe havazás',
          icon: '13n',
        },
      ],
      base: 'stations',
      main: {
        temp: 274.13,
        feels_like: 271.03,
        temp_min: 274.13,
        temp_max: 274.13,
        pressure: 1018,
        humidity: 94,
        sea_level: 1018,
        grnd_level: 998,
      },
      visibility: 10000,
      wind: {
        speed: 2.77,
        deg: 15,
        gust: 5.8,
      },
      snow: {
        '1h': 0.18,
      },
      clouds: {
        all: 94,
      },
      dt: 1674336858,
      sys: {
        country: 'HU',
        sunrise: 1674281921,
        sunset: 1674314418,
      },
      timezone: 3600,
      id: 721239,
      name: 'Eger',
      cod: 200,
      currentDate: '',
    };
    service.getWeather('Eger').subscribe((weather) => {
      expect(weather).toEqual(mockWeather);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockWeather);
    httpMock.verify();
  });
});
