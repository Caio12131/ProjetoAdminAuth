import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink,  Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import  { User } from "@angular/fire/auth"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user
    })
  }

  async logout() {
    try {
      await this.authService.logout()
      this.router.navigate(["/login"])
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }
}
