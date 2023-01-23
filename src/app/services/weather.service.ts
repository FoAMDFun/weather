// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Environment
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Weather } from '../interfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY: string = '';
  public baseUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=Eger&lang=hu&APPID=${this.API_KEY}`;

  constructor(private httpClient: HttpClient) {
    // get API_KEY from environment.ts
    this.API_KEY = environment.weatherApiKey;
    this.baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=Eger&lang=hu&APPID=${this.API_KEY}`;
  }

  getWeather(city: string): Observable<Weather> {
    // city: string = 'London,uk' 'Budapest,hu' 'New York,us'
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=hu&APPID=${this.API_KEY}`;

    return this.httpClient.get<Weather>(endpoint);
  }
}
