import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCalculatorTimeComponent } from './other-calculator-time.component';

describe('OtherCalculatorTimeComponent', () => {
  let component: OtherCalculatorTimeComponent;
  let fixture: ComponentFixture<OtherCalculatorTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherCalculatorTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherCalculatorTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
