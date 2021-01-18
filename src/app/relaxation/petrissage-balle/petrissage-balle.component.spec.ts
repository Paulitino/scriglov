import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrissageBalleComponent } from './petrissage-balle.component';

describe('PetrissageBalleComponent', () => {
  let component: PetrissageBalleComponent;
  let fixture: ComponentFixture<PetrissageBalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrissageBalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrissageBalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
