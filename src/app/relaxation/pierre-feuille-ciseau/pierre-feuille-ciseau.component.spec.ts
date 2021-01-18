import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PierreFeuilleCiseauComponent } from './pierre-feuille-ciseau.component';

describe('PierreFeuilleCiseauComponent', () => {
  let component: PierreFeuilleCiseauComponent;
  let fixture: ComponentFixture<PierreFeuilleCiseauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PierreFeuilleCiseauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PierreFeuilleCiseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
