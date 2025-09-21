// app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // ✅ necessário para router-outlet

@Component({
  selector: 'app-root',
  standalone: true,  // componente standalone
  imports: [RouterModule],  // ✅ importa RouterModule
  templateUrl: './app.html',
})
export class AppComponent {}
