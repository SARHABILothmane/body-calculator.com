import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CalculatorScientifiqueComponent } from './calculator-scientifique/calculator-scientifique.component';
import { NgxJsonLdModule } from 'ngx-json-ld';


@NgModule({
  declarations: [
    HomeComponent,
    CalculatorScientifiqueComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxJsonLdModule
  ]
})
export class HomeModule { }
