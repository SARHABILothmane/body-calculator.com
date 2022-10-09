import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent implements AfterViewInit {
  constructor() {
   }

      ngAfterViewInit() {
        setTimeout(() => {
            try {
                (window['adsbygoogle'] = window['adsbygoogle'] || []).push({
                    overlays: {bottom: true}
                });
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
  // ngOnInit(): void {
  // }

}
