import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="wrap-loader">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
  `,
  styles: [`
    .wrap-loader {
        width: 100%;
        position: fixed;
        bottom: 55px;
        left: 0;
    }
  `]
})
export class LoaderComponent {
 }
