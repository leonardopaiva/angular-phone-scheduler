import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { CustomButton } from '../../../shared/components/custom-button.component';
import { ContactsService } from '../contacts.service';

import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacts-list',
  standalone: false,
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {

  contacts: Contact[] = [] as Contact[];
  filteredContacts: Contact[] = [...this.contacts];

  filteringItems: Boolean = false;
  filteringRegister: ReturnType<typeof setTimeout> | null = null;

  searchTerm: string = '';

  filterButtons = {
    favorite: {
      label: 'Favoritos',
      icon: 'favorite',
      name: 'favorite',
      active: false,
      description: 'Clique para exibir apenas os contatos favoritos!'
    } as CustomButton,
    disabled: {
      label: 'Desabilitados',
      icon: 'do_not_disturb',
      name: 'disabled',
      active: false,
      description: 'Clique para exibir os contatos desativados!'
    } as CustomButton
  }

  loading: boolean = false;

  constructor(
    private contactsService: ContactsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactsService.items;
    this.filterText('', 0);
	}

  onFilterText(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterText(this.searchTerm);
  }

  filterText(searchTerm?: string, timeout: number = 300) {

    if (!searchTerm) searchTerm = this.searchTerm;

    this.filteringItems = true;
    let filteredItems: Contact[] = [] as Contact[];

    if (this.filteringRegister !== null)
      clearTimeout(this.filteringRegister);

    this.filteringRegister = setTimeout(() => {

      //filtering favorites
      filteredItems = this.contacts.filter(contact => {
        if (this.filterButtons.favorite.active && contact.contato_sn_favorito === 'N')
          return false;

        return true;
      });

      //filtering disabled
      filteredItems = filteredItems.filter(contact => {
        if (this.filterButtons.disabled.active)
          return contact.contato_sn_ativo === 'N';

        return contact.contato_sn_ativo === 'S';;
      });

      //filtering searchTerm
      if (!searchTerm) {
        this.filteredContacts = [...filteredItems];
      } else {
        const lowerTerm = searchTerm.toLowerCase();
        this.filteredContacts = filteredItems.filter(contact => {
            return contact.contato_nome.toLowerCase().includes(lowerTerm)
          }          
        );
      }
      this.filteringItems = false;
      
    }, timeout);
  }

  onFilterButton(item: CustomButton) {
    if (item.name === 'favorite') this.filterButtons.favorite = item;
    if (item.name === 'disabled') this.filterButtons.disabled = item;

    this.filterText();
  }

  async onListItemAction(event: { contact: Contact, action: string }): Promise<void> {

    try {

      this.loading = true;

      const response = await firstValueFrom(this.contactsService.update(event.contact));

      setTimeout(() => {
        this.loading = false;
      }, 300);

    } catch (err) {
        setTimeout(() => {
          this.loading = false;

          this.snackBar.open('Ocorreu um erro ao tentar enviar os dados!', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

          // panelClass: ['success-snackbar']
        }, 500);
    }
  }
}
