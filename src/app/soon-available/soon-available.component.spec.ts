import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoonAvailableComponent } from './soon-available.component';

describe('SoonAvailableComponent', () => {
  let component: SoonAvailableComponent;
  let fixture: ComponentFixture<SoonAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoonAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoonAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
