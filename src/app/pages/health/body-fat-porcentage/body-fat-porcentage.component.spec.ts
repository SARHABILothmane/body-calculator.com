import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFatPorcentageComponent } from './body-fat-porcentage.component';

describe('BodyFatPorcentageComponent', () => {
  let component: BodyFatPorcentageComponent;
  let fixture: ComponentFixture<BodyFatPorcentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyFatPorcentageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyFatPorcentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
