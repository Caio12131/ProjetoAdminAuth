import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  meuBooleano = false;

  atualizaBooleano(valor: boolean){
    this.meuBooleano = valor;
  }

}
