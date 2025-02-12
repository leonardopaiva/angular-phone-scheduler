import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Contact } from '../../views/contacts/contact.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomButton } from './custom-button.component';
import { FooterActionButtonComponent } from './footer-action-button.component';
import { CommonModule } from '@angular/common';
import { PhoneMaskPipe } from '../../shared/pipes/phone-mask.pipe'; 
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-list-item',
	standalone: true,
	imports: [
		MatCardModule, 
		MatIconModule, 
		MatButtonModule, 
		FooterActionButtonComponent, 
		CommonModule, 
		PhoneMaskPipe,
		RouterModule,
		MatTooltipModule
	],
	template: `
		<mat-card class="item-card" appearance="outlined">
			<mat-card-header>
				<div mat-card-avatar class="avatar-icon">
					<mat-icon>person</mat-icon>
				</div>
				<mat-card-title  >{{contact.contato_nome}}  <mat-icon matTooltip="{{tooltipInfo}}">info</mat-icon></mat-card-title>
				<mat-card-subtitle >{{ contact.contato_celular | phoneMask }}</mat-card-subtitle>
			</mat-card-header>
					
			<mat-card-actions>
				<app-footer-action-button 
					[item]="actionFavoriteButton"  
					(buttonClick)="onActionButton($event)"
					class="mr-2"
					style="margin-right: 10px!important;"
					></app-footer-action-button>
				<app-footer-action-button 
					[item]="actionDisabledButton"  
					(buttonClick)="onActionButton($event)"
					style="margin-right: 10px!important;"
					></app-footer-action-button>
				<a mat-stroked-button 
					[routerLink]="['/contacts/update', contact.contato_id]"
					matTooltip="Clique para editar o contato!"
					>EDITAR</a>
			</mat-card-actions>
		</mat-card>
	`,
	styles: [`
		:host {
			display: block;
		}

		.item-card {
			margin-bottom: 0;
		}

		.avatar-icon {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			mat-icon {
				font-size: 42px; 
				line-height: 42px; 
				width: 42px; 
				height: 42px;
			}
		}

		.mat-mdc-card-actions {
			justify-content: space-evenly;
		}
		@media (max-width: 768px) {
			.mat-mdc-card-actions {
				justify-content: flex-end;
			}
		}

	`]
})
export class ListItemComponent {
  @Input() contact!: Contact;
	@Output() actionChange = new EventEmitter<{ contact: Contact, action: string }>();

	tooltipInfo: string = '';

	actionFavoriteButton: CustomButton = {
		label: '',
		icon: 'favorite',
		name: 'favorite',
		active: true,
		description: 'Clique para tornar o contato um favorito!'
	}

	actionDisabledButton: CustomButton = {
		label: '',
		icon: 'do_not_disturb',
		name: 'disabled',
		active: false,
		description: 'Clique para desativar o contato!'
	}

	constructor() {}

	ngOnInit(): void {
		this.actionFavoriteButton.active = this.contact.contato_sn_favorito === 'S';
		this.actionDisabledButton.active = this.contact.contato_sn_ativo === 'N';

		this.tooltipInfo = `Informações adicionais: Telefone ${this.contact.contato_telefone} / E-mail ${this.contact.contato_email}`;

	}

	onActionButton(item: CustomButton) {
		if (item.name === 'favorite') {
			this.contact.contato_sn_favorito = (this.actionFavoriteButton.active) ?  'S' : 'N';
		}
		if (item.name === 'disabled') {
			this.contact.contato_sn_ativo = (this.actionDisabledButton.active) ?  'N' : 'S';
		}

		this.actionChange.emit({ contact: this.contact, action: item.name });

	}
}
