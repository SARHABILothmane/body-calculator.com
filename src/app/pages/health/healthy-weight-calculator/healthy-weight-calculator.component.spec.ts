import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyWeightCalculatorComponent } from './healthy-weight-calculator.component';

describe('HealthyWeightCalculatorComponent', () => {
  let component: HealthyWeightCalculatorComponent;
  let fixture: ComponentFixture<HealthyWeightCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthyWeightCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthyWeightCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
