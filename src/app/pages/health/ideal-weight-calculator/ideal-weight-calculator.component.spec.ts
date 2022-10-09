import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdealWeightCalculatorComponent } from './ideal-weight-calculator.component';

describe('IdealWeightCalculatorComponent', () => {
  let component: IdealWeightCalculatorComponent;
  let fixture: ComponentFixture<IdealWeightCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdealWeightCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdealWeightCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
