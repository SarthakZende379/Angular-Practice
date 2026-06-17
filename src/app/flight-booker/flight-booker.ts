import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-booker',
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-booker.html',
  styleUrl: './flight-booker.css',
})
export class FlightBooker {

  flightType = 'one-way';
  departureDate = '';
  returnDate = '';
  error = '';
  success = '';

  onSubmit() {
    this.error = '';
    this.success = '';

    const today = new Date();
    const departure = new Date(this.departureDate);
    const returnD = new Date(this.returnDate);

    if (!this.departureDate) {
      this.error = 'Please enter a departure date.';
      return;
    }

    if (departure < today) {
      this.error = 'Departure date cannot be in the past.';
      return;
    }

    if (this.flightType === 'return') {
      if (!this.returnDate) {
        this.error = 'Please enter a return date.';
        return;
      }
      if (returnD < departure) {
        this.error = 'Return date cannot be before departure date.';
        return;
      }
      this.success = `You have booked a return flight, departing on ${this.departureDate} and returning on ${this.returnDate}`;
    } else {
      this.success = `You have booked a one-way flight on ${this.departureDate}`;
    }
  }
}