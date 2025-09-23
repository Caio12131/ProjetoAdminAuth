import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // 👈 IMPORTANTE
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // 👈 habilita routerLink
  templateUrl: './jogos.html',
  styleUrls: ['./jogos.css']
})
export class JogosComponent {
  nome: string = '';
  idade: number | null = null;
  usuarios: any[] = [];

  constructor(private userService: UserService) {}

adicionarUsuario() {
  if (this.nome && this.idade) {
    const usuario = {
      nome: this.nome,
      idade: this.idade,
      createdAt: new Date().toISOString() // salva a data atual como string ISO
    };

    this.userService.adicionar(usuario).then(() => {
      this.nome = '';
      this.idade = null;
      this.listarUsuarios();
    });
  } else {
    alert('Preencha todos os campos!');
  }
}


  listarUsuarios() {
    this.userService.listar().subscribe((data: any) => {
      this.usuarios = data;
    });
  }
}
