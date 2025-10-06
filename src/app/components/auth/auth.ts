import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h2>🔑 Entrar / Criar Conta</h2>

      <input type="email" [(ngModel)]="email" placeholder="Email" />
      <input type="password" [(ngModel)]="senha" placeholder="Senha" />

      <button (click)="login()">Entrar</button>
      <button (click)="cadastrar()">Criar Conta</button>
    </div>
  `,
  styles: [`
    .auth-container { text-align: center; margin-top: 20px; }
    input { display: block; margin: 8px auto; padding: 5px; }
    button { margin: 5px; padding: 8px 16px; }
  `]
})
export class AuthComponent {
  email: string = '';
  senha: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.senha);
      alert("✅ Login realizado com sucesso!");
    } catch (err: any) {
      alert("❌ Erro no login: " + err.message);
    }
  }

  async cadastrar() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.senha);
      alert("✅ Conta criada e usuário logado!");
    } catch (err: any) {
      alert("❌ Erro no cadastro: " + err.message);
    }
  }
}
