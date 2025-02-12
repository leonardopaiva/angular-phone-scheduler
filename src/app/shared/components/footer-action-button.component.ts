import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CustomButton } from './custom-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-footer-action-button',
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
    template: `
		<div class="custom-button-container">
			<button 
				(click)="onButtonClick()"
				mat-mini-fab 
				extended 
				routerLink="." 
				[color]="buttonColor"
				class="custom-button"
				matTooltip="{{item.description}}">
				<mat-icon >
					{{item.icon}}
				</mat-icon>
			</button>
		</div>
    `,
    styles: [`
			:host {
					display: block;
			}
			.custom-button-container {
				display: flex;
				justify-content: center;
			}

			.custom-button {
				box-shadow: none; 
				elevation: 0; 
			}
    `]
})
export class FooterActionButtonComponent {
	@Output() buttonClick = new EventEmitter<CustomButton>();

	@Input() item!: CustomButton;
	buttonColor: string = '';

	ngOnInit(): void {
		this.buttonColor = (this.item.active) ? 'primary' : 'secondary';
	}
	
	onButtonClick(): void {
		this.buttonColor = (this.item.active) ? 'secondary' : 'primary';
		this.item.active = !this.item.active;
		this.buttonClick.emit(this.item);
	}
}