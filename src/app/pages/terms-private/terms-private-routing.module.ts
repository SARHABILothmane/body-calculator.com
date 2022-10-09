import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: "terms/.", component: TermsComponent },
  { path: "private-policy/.", component: PrivatePolicyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsPrivateRoutingModule { }
