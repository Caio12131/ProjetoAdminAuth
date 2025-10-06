import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import {  Router, RouterLink } from "@angular/router"
import  { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.html",
  styleUrls: ["./register.css"],
})
export class RegisterComponent {
  email = ""
  password = ""
  confirmPassword = ""
  loading = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = "Por favor, preencha todos os campos."
      return
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "As senhas não coincidem."
      return
    }

    if (this.password.length < 6) {
      this.errorMessage = "A senha deve ter pelo menos 6 caracteres."
      return
    }

    this.loading = true
    this.errorMessage = ""

    try {
      await this.authService.register(this.email, this.password)
      this.router.navigate(["/jogos"])
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code)
    } finally {
      this.loading = false
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Este email já está em uso."
      case "auth/invalid-email":
        return "Email inválido."
      case "auth/weak-password":
        return "A senha é muito fraca."
      default:
        return "Erro ao criar conta. Tente novamente."
    }
  }
}
