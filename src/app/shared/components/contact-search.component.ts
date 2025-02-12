import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field appearance="outline" class="search-field">
      <mat-label>Buscar pelo nome do contato</mat-label>
      <input
        matInput
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange($event)"
        placeholder="Digite o nome" />
    </mat-form-field>
  `,
  styles: [`
    .search-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class ContactSearchComponent {
  searchTerm: string = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }
}
