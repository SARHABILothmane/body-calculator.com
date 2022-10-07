import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { OtherCalculatorHealthComponent } from './other-calculator-health/other-calculator-health.component';
import { OtherCalculatorTimeComponent } from './other-calculator-time/other-calculator-time.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OtherCalculatorHealthComponent,
    OtherCalculatorTimeComponent
  ],
  imports: [
    // CommonModule
    RouterModule
  ],
  exports: [OtherCalculatorHealthComponent, OtherCalculatorTimeComponent]
})
export class OtherCalculatorModule { }
