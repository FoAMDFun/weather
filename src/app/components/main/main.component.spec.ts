import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../../services/weather.service';
import { MainComponent } from './main.component';
import { of } from 'rxjs';
import { Weather } from '../../interfaces/weather';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let weatherService: WeatherService;
  let toastr: ToastrService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [WeatherService, ToastrService],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for a city', () => {
    spyOn(weatherService, 'getWeather').and.returnValue(of(mockWeather));
    spyOn(toastr, 'success');
    component.searchTerm = 'test city';

    component.search();

    expect(weatherService.getWeather).toHaveBeenCalledWith('test city');

    expect(toastr.success).toHaveBeenCalledWith(
      `test city város hozzáadva a listához`,
      'Siker!'
    );

    expect(component.searchResults.length).toBe(1);
  });
});
