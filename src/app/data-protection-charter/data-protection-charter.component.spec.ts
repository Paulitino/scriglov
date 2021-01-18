import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionCharterComponent } from './data-protection-charter.component';

describe('DataProtectionCharterComponent', () => {
  let component: DataProtectionCharterComponent;
  let fixture: ComponentFixture<DataProtectionCharterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProtectionCharterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProtectionCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
