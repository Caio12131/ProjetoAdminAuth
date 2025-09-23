// app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { JogosComponent } from './components/jogos/jogos';
import { AdminComponent } from './components/admin/admin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'jogos', component: JogosComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', redirectTo: 'jogos', pathMatch: 'full' }
    ]),

    // ✅ inicializa Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
};
