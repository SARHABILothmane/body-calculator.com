import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCalculatorHealthComponent } from './other-calculator-health.component';

describe('OtherCalculatorHealthComponent', () => {
  let component: OtherCalculatorHealthComponent;
  let fixture: ComponentFixture<OtherCalculatorHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherCalculatorHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherCalculatorHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
