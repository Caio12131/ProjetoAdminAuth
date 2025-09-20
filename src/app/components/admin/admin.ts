import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./admin.html",
  styleUrls: ["./admin.css"],
})
export class AdminComponent {
  usuarios: any[] = []
  usuariosFiltrados: any[] = []
  filtroNome = ""
  filtroIdadeMin: number | null = null
  filtroIdadeMax: number | null = null

  constructor() {
    const dados = localStorage.getItem("usuarios")
    if (dados) {
      this.usuarios = JSON.parse(dados)
      this.usuariosFiltrados = [...this.usuarios]
    }
  }

  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter((usuario) => {
      const nomeMatch = this.filtroNome === "" || usuario.nome.toLowerCase().includes(this.filtroNome.toLowerCase())

      const idadeMinMatch = this.filtroIdadeMin === null || usuario.idade >= this.filtroIdadeMin

      const idadeMaxMatch = this.filtroIdadeMax === null || usuario.idade <= this.filtroIdadeMax

      return nomeMatch && idadeMinMatch && idadeMaxMatch
    })
  }

  limparFiltros() {
    this.filtroNome = ""
    this.filtroIdadeMin = null
    this.filtroIdadeMax = null
    this.usuariosFiltrados = [...this.usuarios]
  }

  atualizarLista() {
    const dados = localStorage.getItem("usuarios")
    if (dados) {
      this.usuarios = JSON.parse(dados)
      this.filtrarUsuarios()
    }
  }
}
