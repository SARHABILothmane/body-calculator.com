import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BannerComponent } from './banner.component';



@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [BannerComponent]
})
export class BannerModule { }
