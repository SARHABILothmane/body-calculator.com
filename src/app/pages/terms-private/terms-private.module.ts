import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsPrivateRoutingModule } from './terms-private-routing.module';
import { TermsComponent } from './terms/terms.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';


@NgModule({
  declarations: [
    TermsComponent,
    PrivatePolicyComponent
  ],
  imports: [
    CommonModule,
    TermsPrivateRoutingModule
  ]
})
export class TermsPrivateModule { }
