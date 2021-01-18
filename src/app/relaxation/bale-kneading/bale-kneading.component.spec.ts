import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaleKneadingComponent } from './bale-kneading.component';

describe('BaleKneadingComponent', () => {
  let component: BaleKneadingComponent;
  let fixture: ComponentFixture<BaleKneadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaleKneadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaleKneadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
