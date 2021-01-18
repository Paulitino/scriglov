import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobsonVideoDeuxComponent } from './jacobson-video-deux.component';

describe('JacobsonVideoDeuxComponent', () => {
  let component: JacobsonVideoDeuxComponent;
  let fixture: ComponentFixture<JacobsonVideoDeuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacobsonVideoDeuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobsonVideoDeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
