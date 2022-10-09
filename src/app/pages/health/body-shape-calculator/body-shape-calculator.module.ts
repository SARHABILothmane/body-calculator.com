import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyShapeCalculatorComponent } from './body-shape-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';
import { RouterModule, Routes } from '@angular/router';
import { BannerModule } from 'src/app/shared/banner/banner.module';

const routes: Routes = [
  { path: "", component: BodyShapeCalculatorComponent },
];

@NgModule({
  declarations: [
    BodyShapeCalculatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxJsonLdModule,
    OtherCalculatorModule,
    RouterModule.forChild(routes),
    BannerModule,
  ]
})
export class BodyShapeCalculatorModule { }
