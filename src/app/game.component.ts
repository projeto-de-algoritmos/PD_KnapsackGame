// src/app/game.component.ts

import { Component } from '@angular/core';
import { GameService } from './game.service';
import Items from 'src/entity/Items';
import Rooms from 'src/entity/Graph';

@Component({
  selector: 'app-game',
  template: `
    <h1>Tente terminar o jogo com o máximo de moedas, sem ultrapassar 10kgs </h1>
    <div *ngFor="let room of rooms">
    <h2>{{ room.nomeSala }}</h2>
      <ul style="list-style: none;">
      <li *ngFor="let item of room.items">
        {{ item.name }} (Peso: {{ item.weight }}, Valor: {{ item.value }})
        <button (click)="takeItem(item)">Levar</button>
      </li>
    </ul>
  </div>
    <button (click)="nextRoon()">Práxima sala</button>
    <hr>
    <div>
      <h2>Mochila</h2>
      <h3>Peso: {{pesoMochila}}</h3>
      <ul style="list-style: none;">
        <li *ngFor="let item of knapsack">
        {{ item.name }} (Peso: {{ item.weight }}, Valor: {{ item.value }})
        <button (click)="leaveItem(item)">Deixar</button>
        </li>
      </ul>
    </div>
  `
})
export class GameComponent {
  rooms: Rooms[] = [];
  knapsack: Items[] = []
  pesoMochila = 0;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.rooms = this.gameService.getRooms();
  }

  takeItem(item: Items) {
    const currentRoom = this.rooms[0];
    const nextRoom = this.rooms[1];
  
    currentRoom.items = currentRoom.items.filter((i) => i !== item);
    
    this.knapsack.push(item);
    this.pesoMochila += item.weight;
  }
  
  leaveItem(item: Items) {
    const currentRoom = this.rooms[0];
  
    currentRoom.items.push(item); //= currentRoom.items.filter((i) => i !== item);
    this.knapsack = this.knapsack.filter((i) => i !== item);
    this.pesoMochila -= item.weight;
  }
  


  nextRoon(){
    const capacity = 10;
    let PesoMochila = 0;
    this.knapsack.forEach(element => PesoMochila += element.weight )
    
    if(PesoMochila > capacity){
      alert('Capacidade da mochila excedida, tente deixar alguns itens');
      return;
    }

    const maxValue = this.gameService.findMaxValueKnapsack(this.gameService.getCurrentRoomIndex(), capacity,this.knapsack );

    const ValorMoeda = maxValue.value
    const ListaItens = maxValue.selectedItems
    let texto = ''
    ListaItens.forEach(element => texto += element.name + ', ')

   // alert('Resultado Ótimo da Sala: '+ ValorMoeda + ListaItens);
    alert('Resultado Ótimo possível na sala: '+ ValorMoeda + ' moedas, pegando os itens: ' + texto);

    this.gameService.goToNextRoom();
    this.rooms = this.gameService.getRooms();
  }
}
