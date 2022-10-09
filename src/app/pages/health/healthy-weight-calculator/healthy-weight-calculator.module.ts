import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthyWeightCalculatorComponent } from './healthy-weight-calculator.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';

const routes: Routes = [
  { path: "", component: HealthyWeightCalculatorComponent },
];

@NgModule({
  declarations: [
    HealthyWeightCalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxJsonLdModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
  ]
})
export class HealthyWeightCalculatorModule { }
