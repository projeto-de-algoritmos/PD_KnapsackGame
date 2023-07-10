// src/app/game.component.ts

import { Component } from '@angular/core';
import { GameService } from './game.service';
import Items from 'src/entity/Items';
import Rooms from 'src/entity/Graph';

@Component({
  selector: 'app-game',
  template: `
    <h1>Jogo da Mochila</h1>
    <div *ngFor="let room of rooms">
    <h2>{{ room.nomeSala }}</h2>
    <ul>
      <li *ngFor="let item of room.items">
        {{ item.name }} (Peso: {{ item.weight }}, Valor: {{ item.value }})
        <button (click)="takeItem(item)">Levar</button>
        <button (click)="leaveItem(item)">Deixar</button>
      </li>
    </ul>
  </div>
    <button (click)="calculateMaxValue()">Calcular maior valor possível</button>
  `
})
export class GameComponent {
  rooms: Rooms[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.rooms = this.gameService.getRooms();
  }

  takeItem(item: Items) {
    const currentRoom = this.rooms[0];
    const nextRoom = this.rooms[1];
  
    currentRoom.items = currentRoom.items.filter((i) => i !== item);
    nextRoom.items.push(item);
  }
  
  leaveItem(item: Items) {
    const currentRoom = this.rooms[0];
  
    currentRoom.items = currentRoom.items.filter((i) => i !== item);
  }
  

  calculateMaxValue() {
    const capacity = 10; // Capacidade da mochila (ajuste conforme necessário)
 //   const maxValue = this.gameService.findMaxValueKnapsack(capacity);
  //  console.log('Maior valor possível:', maxValue);
  }
}