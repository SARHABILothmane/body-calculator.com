import { NgxJsonLdModule } from 'ngx-json-ld';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBmiModule } from '../../home/form-bmi/form-bmi.module';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';
import { RouterModule, Routes } from '@angular/router';
import { BodyMassWomenComponent } from './body-mass-women.component';

const routes: Routes = [
  { path: "", component: BodyMassWomenComponent },
];


@NgModule({
  declarations: [
    BodyMassWomenComponent
  ],
  imports: [
    CommonModule,
    NgxJsonLdModule,
    FormBmiModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
  ]
})
export class BodyMassWomenModule { }
