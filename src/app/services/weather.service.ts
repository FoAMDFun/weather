// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY: string = '';

  constructor(private httpClient: HttpClient) {
    // get API_KEY from environment.ts
    this.API_KEY = environment.weatherApiKey;
  }

  getWeather(city: string) {
    // city: string = 'London,uk' 'Budapest,hu' 'New York,us'
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.API_KEY}`;

    return this.httpClient.get(endpoint);
  }
}
