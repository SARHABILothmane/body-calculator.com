import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthComponent } from './health.component';

const routes: Routes = [
  {
    path: "", component: HealthComponent, children: [
      { path: "bmi-calculator", loadChildren: () => import("src/app/pages/health/body-mass-index/body-mass-index.module").then(mod => mod.BodyMassIndexModule) },
      { path: "bmi-calculator-women", loadChildren: () => import("src/app/pages/health/body-mass-women/body-mass-women.module").then(mod => mod.BodyMassWomenModule) },
      { path: "bmi-calculator-men", loadChildren: () => import("src/app/pages/health/body-mass-men/body-mass-men.module").then(mod => mod.BodyMassMenModule) },
      // { path: "body-fat-percentage-calculator/.", loadChildren: () => import("src/app/pages/health/body-fat-porcentage/body-fat-porcentage.module").then(mod => mod.BodyFatPorcentageModule) },
      // { path: "ideal-weight-calculator/.", loadChildren: () => import("src/app/pages/health/ideal-weight-calculator/ideal-weight-calculator.module").then(mod => mod.IdealWeightCalculatorModule) },
      // { path: "body-shape-calculator/.", loadChildren: () => import("src/app/pages/health/body-shape-calculator/body-shape-calculator.module").then(mod => mod.BodyShapeCalculatorModule) },
      // { path: "bmr-calculator/.", loadChildren: () => import("src/app/pages/health/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator.module").then(mod => mod.BasalMetabolicRateCalculatorModule) },
      // { path: "date-calculator/.", loadChildren: () => import("src/app/pages/calculator/date-calculator/date-calculator.module").then(mod => mod.DateCalculatorModule) },
      // { path: "age-calculator/.", loadChildren: () => import("src/app/pages/calculator/age-calculator/age-calculator.module").then(mod => mod.AgeCalculatorModule) },
      // { path: "healthy-weight-calculator/.", loadChildren: () => import("src/app/pages/health/healthy-weight-calculator/healthy-weight-calculator.module").then(mod => mod.HealthyWeightCalculatorModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRoutingModule { }
