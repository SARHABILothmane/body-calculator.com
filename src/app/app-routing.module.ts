import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import("src/app/pages/home/home.module").then(mod => mod.HomeModule) },
  { path: "health", loadChildren: () => import("src/app/pages/health/health.module").then(mod => mod.HealthModule) },
  { path: "calculators", loadChildren: () => import("src/app/pages/calculator/calculator.module").then(mod => mod.CalculatorModule) },
  // { path: "math", loadChildren: () => import("src/app/pages/math/math.module").then(mod => mod.MathModule) },
  { path: "", loadChildren: () => import("src/app/pages/terms-private/terms-private.module").then(mod => mod.TermsPrivateModule) },
  { path: "contact/.", loadChildren: () => import("src/app/pages/contact/contact.module").then(mod => mod.ContactModule) },
  // { path: '404/.', loadChildren: () => import("src/app/pages/pagenotfound/pagenotfound.module").then(mod => mod.PagenotfoundModule) },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    useHash: false,
    enableTracing: false,
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
