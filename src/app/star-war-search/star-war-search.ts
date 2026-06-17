import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { SwapiService } from '../swapi';

@Component({
  selector: 'app-star-war-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './star-war-search.html',
  styleUrl: './star-war-search.css'
})
export class StarWarSearch {
  swapiService = inject(SwapiService);

  name = '';
  films = signal<any[]>([]);

  search() {
    this.films.set([]);

    this.swapiService.getPeople().pipe(
      map(people => people.find(p => p.name.toLowerCase() === this.name.toLowerCase()))
    ).subscribe(person => {
      if (person) {
        for (const url of person.films) {
          this.swapiService.getFilm(url).subscribe(film => {
            this.films.set([...this.films(), film]);
          });
        }
      }
    });
  }
}