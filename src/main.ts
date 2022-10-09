import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Location } from '@angular/common';

let queryString$: RegExpMatchArray | null;
const __stripTrailingSlash = (Location as any).stripTrailingSlash;

(Location as any).stripTrailingSlash = function _stripTrailingSlash(url: string): string {
  this.queryString$ = url.match(/([^?]*)?(.*)/);
  if (this.queryString$[2].length > 0) {
    return /[^\/]\/$/.test(this.queryString$[1]) ? this.queryString$[1] + '.' + this.queryString$[2] : __stripTrailingSlash(url);
  }
  return /[^\/]\/$/.test(url) ? url + '.' : __stripTrailingSlash(url);
};

if (environment.production) {
  enableProdMode();
}


if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
};


 if (document.readyState === 'complete') {
   bootstrap();
 } else {
   document.addEventListener('DOMContentLoaded', bootstrap);
 }
 
