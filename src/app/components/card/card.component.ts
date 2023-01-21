import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private KELVIN_VALUE: number = 273.15;
  @Input() data: any;
  @Output() deleteButtonClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public kelvinToCelsius(kelvin: number): string {
    return (kelvin - this.KELVIN_VALUE).toFixed(0);
  }

  public kelvinToFahrenheit(kelvin: number): string {
    return ((kelvin - this.KELVIN_VALUE) * 1.8 + 32).toFixed(0);
  }

  public deleteCard(cardName: string): void {
    // EventEmitter
    this.deleteButtonClicked.emit(cardName);
  }
}
