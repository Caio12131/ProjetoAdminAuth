import type { Routes } from "@angular/router"
import { JogosComponent } from "./components/jogos/jogos"
import { AdminComponent } from "./components/admin/admin"
import { LoginComponent } from "./components/login/login"
import { RegisterComponent } from "./components/register/register"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "jogos",
    component: JogosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/login",
  },
]
