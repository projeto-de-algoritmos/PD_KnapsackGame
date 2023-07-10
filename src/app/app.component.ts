import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Meu Jogo da Mochila</h1>
  <app-game></app-game>
`
})
export class AppComponent {
  title = 'KnapsackGame';
}
