import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="row">
      <div class="col-md-12">
        <h1>Bem vindo a página Home</h1>
        <p>Esta é uma página de demonstração!</p>
      </div>
    </div>
  `,
  styles: [`
  `],
  standalone: true,
})
export class HomeComponent {}
