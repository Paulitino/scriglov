import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoBalleComponent } from './exo-balle.component';

describe('ExoBalleComponent', () => {
  let component: ExoBalleComponent;
  let fixture: ComponentFixture<ExoBalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExoBalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExoBalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
