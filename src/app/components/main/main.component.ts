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

  private notInList(cityName: string): boolean {
    let result = this.searchResults.every((city) => city.name !== cityName);
    if (!result) {
      this.toastr.error(`${cityName} város már szerepel a listában!`);
      this.searchTerm = '';
    }
    return result;
  }

  public deleteCard(cardName: string): void {
    this.searchResults = this.searchResults.filter(
      (city) => city.name !== cardName
    );
    this.toastr.success(`${cardName} város törölve a listáról!`);
  }

  public currentDate(): string {
    const date = new Date();
    // Return date + time
    return date.toLocaleString();
  }

  public search(): void {
    this.weatherService.getWeather(this.searchTerm).subscribe({
      next: (data) => {
        if (this.notInList((data as any).name)) {
          (data as any).currentDate = this.currentDate();
          this.searchResults.unshift(data);
          this.toastr.success(
            `${(data as any).name} város hozzáadva a listához`,
            'Siker!'
          );
          this.searchTerm = '';
        }
      },
      error:
        // error handling, we don't need parameter, assuming no city found
        () => {
          this.toastr.error(
            'Nem található a keresési feltételnek megfelelő város!',
            'Hiba történt!'
          );
        },
    });
  }

  public kelvinToCelsius(kelvin: number): string {
    return (kelvin - this.KELVIN_VALUE).toFixed(0);
  }

  public kelvinToFahrenheit(kelvin: number): string {
    return ((kelvin - this.KELVIN_VALUE) * 1.8 + 32).toFixed(0);
  }
}
