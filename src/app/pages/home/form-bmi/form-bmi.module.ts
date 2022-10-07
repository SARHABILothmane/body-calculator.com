import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBmiComponent } from './form-bmi.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormBmiComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [FormBmiComponent]
})
export class FormBmiModule { }
