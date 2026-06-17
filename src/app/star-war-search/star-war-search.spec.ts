import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarSearch } from './star-war-search';

describe('StarWarSearch', () => {
  let component: StarWarSearch;
  let fixture: ComponentFixture<StarWarSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarWarSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(StarWarSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
