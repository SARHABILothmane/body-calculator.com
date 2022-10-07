import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMassMenComponent } from './body-mass-men.component';

describe('BodyMassMenComponent', () => {
  let component: BodyMassMenComponent;
  let fixture: ComponentFixture<BodyMassMenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMassMenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyMassMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
