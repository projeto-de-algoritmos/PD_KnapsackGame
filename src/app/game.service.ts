// src/app/game.service.ts

import { Injectable } from '@angular/core';
import  Items  from "src/entity/Items";
import  Rooms  from "src/entity/Graph";

@Injectable({
  providedIn: 'root'
})
export class GameService {
    
  public rooms: Rooms[] = [];
  private currentRoomIndex = 0;


  constructor() {
    // Crie as salas e os itens do jogo aqui
    const roomA = new Rooms('Sala A', [
      new Items('Item 1', 2, 10),
      new Items('Item 2', 3, 5),
      new Items('Item 3', 5, 15)
    ]);

    const roomB = new Rooms('Sala B', [
      new Items('Item 4', 1, 8),
      new Items('Item 5', 4, 12)
    ]);

    const roomC = new Rooms('Sala C', [
      new Items('Item 6', 2, 6),
      new Items('Item 7', 3, 18)
    ]);

    // Adicione as salas à lista de salas do jogo
    this.rooms.push(roomA, roomB, roomC);
  }

  findMaxValueKnapsack(currentRoomIndex: number, capacity: number, prevRoomItems: Items[] = []) {
    if (currentRoomIndex < 0 ) {
      return 0;
    }
  
    const currentRoom = this.rooms[currentRoomIndex];
    const availableItems = currentRoom.items.concat(prevRoomItems);
  
    const numItems = availableItems.length;
    const dp: number[][] = [];
  
    // Inicialize a matriz DP
    for (let i = 0; i <= numItems; i++) {
      dp[i] = [];
      for (let j = 0; j <= capacity; j++) {
        dp[i][j] = 0;
      }
    }
  
    // Preencha a matriz DP com os valores máximos possíveis
    for (let i = 1; i <= numItems; i++) {
      const currentItem = availableItems[i - 1];
      for (let j = 1; j <= capacity; j++) {
        if (currentItem.weight <= j) {
          dp[i][j] = Math.max(
            currentItem.value + dp[i - 1][j - currentItem.weight],
            dp[i - 1][j]
          );
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    // Rastreie os itens selecionados
    const selectedItems: Items[] = [];
    let i = numItems;
    let j = capacity;
    while (i > 0 && j > 0) {
      if (dp[i][j] !== dp[i - 1][j]) {
        const selectedItem = availableItems[i - 1];
        selectedItems.push(selectedItem);
        j -= selectedItem.weight;
      }
      i--;
    }
  
    // Retorne o valor máximo e os itens selecionados
    return { value: dp[numItems][capacity], selectedItems: selectedItems.reverse() };
}


  goToNextRoom(): boolean {
    const currentRoomIndex = this.currentRoomIndex;
    const currentRoom = this.rooms[currentRoomIndex];
  
    const maxValue = this.findMaxValueKnapsack(currentRoomIndex, 10, currentRoom.items);
    console.log('Valor máximo da mochila:', maxValue);
  
    this.currentRoomIndex++;
    return this.currentRoomIndex < this.rooms.length;
  }
  getRooms(): Rooms[] {
    return [this.rooms[this.currentRoomIndex]];
  }

  getCurrentRoomIndex(): number {
    return this.currentRoomIndex;
  }

}
