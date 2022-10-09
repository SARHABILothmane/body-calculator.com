import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyShapeCalculatorComponent } from './body-shape-calculator.component';

describe('BodyShapeCalculatorComponent', () => {
  let component: BodyShapeCalculatorComponent;
  let fixture: ComponentFixture<BodyShapeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyShapeCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyShapeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
