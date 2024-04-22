import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarrosselComponent } from './movie-carrossel.component';

describe('MovieCarrosselComponent', () => {
  let component: MovieCarrosselComponent;
  let fixture: ComponentFixture<MovieCarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCarrosselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
