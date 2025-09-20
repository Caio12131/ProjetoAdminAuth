import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,        // <-- faltou isso
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // <-- aqui é "styleUrls" (plural)
})
export class App {
  protected readonly title = signal('app1');
}
