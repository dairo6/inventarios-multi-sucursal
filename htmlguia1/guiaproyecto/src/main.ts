import 'zone.js';  // 👈 siempre arriba
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []), // conservar lo que ya tienes en appConfig
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
}).catch((err) => console.error(err));
