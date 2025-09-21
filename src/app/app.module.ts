// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { JogosComponent } from './components/jogos/jogos';
import { AdminComponent } from './components/admin/admin';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'jogos', component: JogosComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', redirectTo: 'jogos', pathMatch: 'full' }
    ])
  ]
});
