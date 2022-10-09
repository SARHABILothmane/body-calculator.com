import { NgxJsonLdModule } from 'ngx-json-ld';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateCalculatorComponent } from './date-calculator.component';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: DateCalculatorComponent },
];


@NgModule({
  declarations: [
    DateCalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxJsonLdModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
  ]
})
export class DateCalculatorModule { }
