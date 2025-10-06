import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { type ChartConfiguration, Chart } from "chart.js"
import { BaseChartDirective } from "ng2-charts"
import  { UserService } from "../../services/user.service"
import  { AuthService } from "../../services/auth.service"
import  { Router } from "@angular/router"
import  { User } from "@angular/fire/auth"

// ✅ registra todos os elementos, controllers e escalas
import { registerables } from "chart.js"
Chart.register(...registerables)

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: "./admin.html",
  styleUrls: ["./admin.css"],
})
export class AdminComponent implements OnInit {
  usuarios: any[] = []
  usuariosFiltrados: any[] = []
  currentUser: User | null = null

  filtroNome = ""
  filtroIdadeMin: number | null = null
  filtroIdadeMax: number | null = null

  // Ano mostrado no gráfico
  anoAtual: number = new Date().getFullYear()
  limitePassado: number = this.anoAtual - 5
  limiteFuturo: number = this.anoAtual + 5

  // Gráfico
  chartData: ChartConfiguration<"bar">["data"] = {
    labels: [],
    datasets: [{ data: [], label: "Usuários cadastrados", backgroundColor: "#42A5F5" }],
  }

  chartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  }

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
      } else {
        this.atualizarLista()
      }
    })
  }

  atualizarLista() {
    this.userService.listar().subscribe((data: any[]) => {
      console.log("📥 Usuários recebidos do Firebase:", data)
      this.usuarios = data
      this.filtrarUsuarios()
      this.atualizarGrafico()
    })
  }

  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter((u) => {
      const nomeMatch = this.filtroNome ? u.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) : true
      const idadeMinMatch = this.filtroIdadeMin ? u.idade >= this.filtroIdadeMin : true
      const idadeMaxMatch = this.filtroIdadeMax ? u.idade <= this.filtroIdadeMax : true
      return nomeMatch && idadeMinMatch && idadeMaxMatch
    })
  }

  limparFiltros() {
    this.filtroNome = ""
    this.filtroIdadeMin = null
    this.filtroIdadeMax = null
    this.filtrarUsuarios()
  }

  deletarUsuario(id: string) {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      this.userService
        .deletar(id)
        .then(() => {
          this.atualizarLista()
          alert("Usuário deletado com sucesso!")
        })
        .catch((error) => {
          console.error("Erro ao deletar usuário:", error)
          alert("Erro ao deletar usuário.")
        })
    }
  }

  // 🔹 Navegação de anos
  anoAnterior() {
    if (this.anoAtual > this.limitePassado) {
      this.anoAtual--
      this.atualizarGrafico()
    }
  }

  proximoAno() {
    if (this.anoAtual < this.limiteFuturo) {
      this.anoAtual++
      this.atualizarGrafico()
    }
  }

  atualizarGrafico() {
    const contagemPorMes: { [key: string]: number } = {}

    this.usuarios.forEach((u) => {
      if (u.createdAt) {
        let data: Date

        // 🔹 Firestore Timestamp
        if (u.createdAt.seconds) data = new Date(u.createdAt.seconds * 1000)
        // 🔹 String ISO
        else data = new Date(u.createdAt)

        if (!isNaN(data.getTime())) {
          const mesAno = `${String(data.getMonth() + 1).padStart(2, "0")}/${data.getFullYear()}`
          contagemPorMes[mesAno] = (contagemPorMes[mesAno] || 0) + 1
        }
      }
    })

    // Apenas os meses do anoAtual
    const labels: string[] = []
    for (let mes = 1; mes <= 12; mes++) {
      labels.push(`${String(mes).padStart(2, "0")}/${this.anoAtual}`)
    }

    const dados = labels.map((l) => contagemPorMes[l] || 0)

    this.chartData = {
      labels,
      datasets: [
        {
          data: dados,
          label: `Usuários cadastrados (${this.anoAtual})`,
          backgroundColor: "#42A5F5",
        },
      ],
    }
  }
}
