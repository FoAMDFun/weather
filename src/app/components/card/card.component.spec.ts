import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert kelvin to celsius correctly', () => {
    const kelvin = 288.15;
    const celsius = component.kelvinToCelsius(kelvin);
    expect(celsius).toEqual('15');
  });

  it('should convert kelvin to fahrenheit correctly', () => {
    const kelvin = 288.15;
    const fahrenheit = component.kelvinToFahrenheit(kelvin);
    expect(fahrenheit).toEqual('59');
  });

  it('should emit the deleteButtonClicked event when deleteCard is called', () => {
    spyOn(component.deleteButtonClicked, 'emit');
    const cardName = 'card1';
    component.deleteCard(cardName);
    expect(component.deleteButtonClicked.emit).toHaveBeenCalledWith(cardName);
  });
});
