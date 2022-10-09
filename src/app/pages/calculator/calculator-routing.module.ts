import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator.component';

const routes: Routes = [
  {
    path: "", component: CalculatorComponent, children: [
      { path: "date-calculator/.", loadChildren: () => import("src/app/pages/calculator/date-calculator/date-calculator.module").then(mod => mod.DateCalculatorModule) },
      { path: "age-calculator/.", loadChildren: () => import("src/app/pages/calculator/age-calculator/age-calculator.module").then(mod => mod.AgeCalculatorModule) },
      // { path: "time-calculator/.", loadChildren: () => import("src/app/pages/calculator/time-calculator/time-calculator.module").then(mod => mod.TimeCalculatorModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorRoutingModule { }
