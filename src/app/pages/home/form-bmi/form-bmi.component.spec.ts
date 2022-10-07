import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBmiComponent } from './form-bmi.component';

describe('FormBmiComponent', () => {
  let component: FormBmiComponent;
  let fixture: ComponentFixture<FormBmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBmiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
