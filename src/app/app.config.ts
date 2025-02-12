import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import { provideEnvironmentNgxMask } from 'ngx-mask'; 
import { provideNgxMask } from 'ngx-mask';
import { NgxMaskConfig } from 'ngx-mask'; 

const maskConfig: Partial<NgxMaskConfig> = {
  validation: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideEnvironmentNgxMask(maskConfig),
    provideNgxMask()  
  ]
};
