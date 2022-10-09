import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdealWeightCalculatorComponent } from './ideal-weight-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: IdealWeightCalculatorComponent },
];


@NgModule({
  declarations: [
    IdealWeightCalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxJsonLdModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
  ]
})
export class IdealWeightCalculatorModule { }
