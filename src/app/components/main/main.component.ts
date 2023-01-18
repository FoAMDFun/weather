// Core
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private KELVIN_VALUE: number = 273.15;
  public searchTerm: string = '';
  public searchResults: any[];
  constructor(
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {
    this.searchResults = [];
  }

  ngOnInit(): void {}

  private notInList(cityName: string) {
    let result = this.searchResults.every((city) => city.name !== cityName);
    if (!result) {
      this.toastr.error(`${cityName} város már szerepel a listában!`);
      this.searchTerm = '';
    }
    return result;
  }

  search() {
    this.weatherService.getWeather(this.searchTerm + ',hu').subscribe(
      (data) => {
        if (this.notInList((data as any).name)) {
          this.searchResults.unshift(data);
          this.toastr.success(
            `${(data as any).name} város hozzáadva a listához`,
            'Siker!'
          );
          this.searchTerm = '';
        }
      },
      // error handling
      () => {
        this.toastr.error(
          'Hiba történt!',
          'Nem található a keresési feltételnek megfelelő város!'
        );
      }
    );
  }

  kelvinToCelsius(kelvin: number) {
    return (kelvin - this.KELVIN_VALUE).toFixed(2);
  }

  kelvinToFahrenheit(kelvin: number) {
    return ((kelvin - this.KELVIN_VALUE) * 1.8 + 32).toFixed(2);
  }
}
