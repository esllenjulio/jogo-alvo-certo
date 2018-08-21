import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  participante: any;
  mostrarParticipante: boolean = false;
  iniciarJogo: boolean = false;
  valorMinimo: string = '0';
  valorMaximo: string = '100';
  mostrarUltimoGanhador: boolean = false;
  ganhadorRodada: any;
  numAcerto:any;
  listaParticipantes = [];
  valor: any;


  resetarJogo: boolean = false;


  socket;

  constructor() {
    this.socket = io();


    this.socket.on('addPart', (participantes) => {

      this.listaParticipantes.length = 0;
      this.listaParticipantes = participantes;

      let sock = this.socket.id;
      let part = this.listaParticipantes.filter(function (el) {
        return (el.id == sock);
      })
      this.participante = part[0];
      this.mostrarParticipante = true;
      console.log(this.participante)

    })


    this.socket.on('proximaTentativa', (num) => {

      this.valorMinimo = num.minimo;
      this.valorMaximo = num.maximo;

    })


    this.socket.on('finalRodada', (listaParticipantes, ganhador, numAcerto, num) => {

      this.listaParticipantes = listaParticipantes;

      this.ganhadorRodada = ganhador[0];
      this.mostrarUltimoGanhador = true;
      this.numAcerto = numAcerto;
      this.valorMinimo = num.minimo;
      this.valorMaximo = num.maximo;

      if (ganhador[0].id == this.participante.id) {
        console.log("eu")
        this.participante.pontos = ganhador[0].pontos;
      }
      console.log("Fim de jogo o Ganhador foi: " + this.ganhadorRodada.nome)
      this.resetarJogo = true;
    })



  }

  ngOnInit() {

  }



  public iniciarPartida(nome: string): any {

    if (nome.trim().length == 0) {
      alert("Digite seu nome !");
    }
    else {
      this.iniciarJogo = true;
      this.socket.emit('addPart', { "participante": nome });
    }
  }

  public verificarNumero(num: any): any {
    // this.valor = '';
    if (num == "") {
      console.log("Digite um numero");
      this.valor = '';
    } else {
      this.socket.emit('tentativa', num);
      this.valor = '';
    }
  }

  public ocultarSplash() {
   
    this.resetarJogo = false;
   
  }


 

}
