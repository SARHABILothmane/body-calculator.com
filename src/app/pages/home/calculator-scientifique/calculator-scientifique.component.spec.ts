import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorScientifiqueComponent } from './calculator-scientifique.component';

describe('CalculatorScientifiqueComponent', () => {
  let component: CalculatorScientifiqueComponent;
  let fixture: ComponentFixture<CalculatorScientifiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorScientifiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorScientifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
