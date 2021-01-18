import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobsonComponent } from './jacobson.component';

describe('JacobsonComponent', () => {
  let component: JacobsonComponent;
  let fixture: ComponentFixture<JacobsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacobsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
