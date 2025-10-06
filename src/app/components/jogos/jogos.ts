import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink, Router } from "@angular/router"
import  { UserService } from "../../services/user.service"
import  { AuthService } from "../../services/auth.service"
import  { User } from "@angular/fire/auth"

@Component({
  selector: "app-jogos",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./jogos.html",
  styleUrls: ["./jogos.css"],
})
export class JogosComponent implements OnInit {
  nome = ""
  idade: number | null = null
  usuarios: any[] = []
  currentUser: User | null = null
  loading = false

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user
      if (!user) {
        this.router.navigate(["/login"])
      }
    })
  }

  async adicionarUsuario() {
    if (!this.currentUser) {
      alert("Você precisa estar logado para adicionar usuários!")
      this.router.navigate(["/login"])
      return
    }

    if (!this.nome || !this.idade) {
      alert("Preencha todos os campos!")
      return
    }

    this.loading = true

    try {
      const usuario = {
        nome: this.nome,
        idade: this.idade,
        createdAt: new Date().toISOString(),
        createdBy: this.currentUser.email || "unknown",
        createdByUid: this.currentUser.uid,
      }

      await this.userService.adicionar(usuario)

      alert(`Usuário ${this.nome} adicionado com sucesso!`)

      this.nome = ""
      this.idade = null
      this.listarUsuarios()
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error)
      alert("Erro ao adicionar usuário. Tente novamente.")
    } finally {
      this.loading = false
    }
  }

  listarUsuarios() {
    this.userService.listar().subscribe((data: any) => {
      this.usuarios = data
    })
  }
}
