import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyFatPorcentageComponent } from './body-fat-porcentage.component';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OtherCalculatorModule } from '../../other-calculator/other-calculator.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerModule } from 'src/app/shared/banner/banner.module';

const routes: Routes = [
  { path: "", component: BodyFatPorcentageComponent },
];


@NgModule({
  declarations: [
    BodyFatPorcentageComponent
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
export class BodyFatPorcentageModule { }
