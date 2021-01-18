import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobsonVideoComponent } from './jacobson-video.component';

describe('JacobsonVideoComponent', () => {
  let component: JacobsonVideoComponent;
  let fixture: ComponentFixture<JacobsonVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacobsonVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobsonVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
