import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import {  Router, RouterLink } from "@angular/router"
import  { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
})
export class LoginComponent {
  email = ""
  password = ""
  loading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = "Por favor, preencha todos os campos."
      return
    }

    this.loading = true
    this.errorMessage = ""

    try {
      await this.authService.login(this.email, this.password)
      this.router.navigate(["/jogos"])
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code)
    } finally {
      this.loading = false
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case "auth/user-not-found":
        return "Usuário não encontrado."
      case "auth/wrong-password":
        return "Senha incorreta."
      case "auth/invalid-email":
        return "Email inválido."
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde."
      default:
        return "Erro ao fazer login. Tente novamente."
    }
  }
}
