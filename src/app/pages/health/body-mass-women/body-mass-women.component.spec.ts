import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMassWomenComponent } from './body-mass-women.component';

describe('BodyMassWomenComponent', () => {
  let component: BodyMassWomenComponent;
  let fixture: ComponentFixture<BodyMassWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMassWomenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyMassWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
