import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private http = inject(HttpClient);

  getPeople() {
    return this.http.get<any[]>('https://swapi.info/api/people');
  }

  getFilm(url: string) {
    return this.http.get<any>(url);
  }
}