import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicHandComponent } from './graphic-hand.component';

describe('GraphicHandComponent', () => {
  let component: GraphicHandComponent;
  let fixture: ComponentFixture<GraphicHandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicHandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
