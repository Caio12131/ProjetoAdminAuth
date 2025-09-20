import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common" // <-- necessário para ngIf e ngFor

@Component({
  selector: "app-jogos",
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], // <-- adicione CommonModule
  templateUrl: "./jogos.html",
  styleUrls: ["./jogos.css"], // Updated to use the new CSS file
})
export class JogosComponent {
  nome = ""
  idade: number | null = null
  usuarios: { nome: string; idade: number }[] = []

  adicionarUsuario() {
    if (this.nome && this.idade != null) {
      const novo = { nome: this.nome, idade: this.idade }
      const salvos = JSON.parse(localStorage.getItem("usuarios") || "[]")
      salvos.push(novo)
      localStorage.setItem("usuarios", JSON.stringify(salvos))
      this.nome = ""
      this.idade = null
      alert("Usuário adicionado!")
    } else {
      alert("Preencha nome e idade.")
    }
  }

  listarUsuarios() {
    this.usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
  }
}
