import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import("src/app/pages/home/home.module").then(mod => mod.HomeModule) },
  { path: "health", loadChildren: () => import("src/app/pages/health/health.module").then(mod => mod.HealthModule) },
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
