import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface CustomButton {
	label: string;
	icon: string; 
	name: string;
	active: boolean;
	description: string;
}

@Component({
    selector: 'app-custom-button',
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
    template: `
		<div class="custom-button-container">
			<button 
				(click)="onButtonClick()"
				mat-fab 
				extended 
				routerLink="." 
				[color]="buttonColor"
				matTooltip="{{item.description}}">
				<mat-icon>
					{{item.icon}}
				</mat-icon>
				<span>{{item.label}}</span>
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

			@media (max-width: 768px) {
				button span {
					display: inline-block;
					max-width: 6ch; 
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
    `]
})
export class CustomButtonComponent {
	@Output() buttonClick = new EventEmitter<CustomButton>();

	@Input() item!: CustomButton;
	buttonColor: string = 'secondary';
	
	onButtonClick(): void {
		this.buttonColor = (this.item.active) ? 'secondary' : 'primary';
		this.item.active = !this.item.active;
		this.buttonClick.emit(this.item);
	}
}