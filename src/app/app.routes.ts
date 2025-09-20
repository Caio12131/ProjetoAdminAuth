import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { App } from './app';
import { JogosComponent } from './components/jogos/jogos';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
{
    path: "",
    component: JogosComponent
},
{
    path: "home",
    component: Home
},
{
    path: "jogos",
    component: JogosComponent
},
{
    path: "admin",
    component: AdminComponent
}
];
