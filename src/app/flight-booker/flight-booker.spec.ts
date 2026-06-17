import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBooker } from './flight-booker';

describe('FlightBooker', () => {
  let component: FlightBooker;
  let fixture: ComponentFixture<FlightBooker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBooker],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightBooker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
