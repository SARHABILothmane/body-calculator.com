import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeCalculatorComponent } from './age-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: AgeCalculatorComponent },
];


@NgModule({
  declarations: [
    AgeCalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxJsonLdModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
  ]
})
export class AgeCalculatorModule { }
