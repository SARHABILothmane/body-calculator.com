import { FormBmiModule } from './../../home/form-bmi/form-bmi.module';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyMassIndexComponent } from './body-mass-index.component';
import { RouterModule, Routes } from '@angular/router';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';

const routes: Routes = [
  { path: "", component: BodyMassIndexComponent },
];


@NgModule({
  declarations: [
    BodyMassIndexComponent
  ],
  imports: [
    CommonModule,
    NgxJsonLdModule,
    FormBmiModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
  ]
})
export class BodyMassIndexModule { }
