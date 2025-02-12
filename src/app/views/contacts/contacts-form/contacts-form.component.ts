import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-form',
  standalone: false,
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent {
  contactForm!: FormGroup;
  contact: Contact = {} as Contact;

  loading: boolean = false;
  editMode: boolean = false;

  constructor(
    private contactsService: ContactsService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
		this.initForm();

    const contactId = this.route.snapshot.paramMap.get('id');
    if (!contactId) return;
    
    this.editMode = true;
    this.loadContactData(contactId);
	}

  /**
   * Initialize the reactive form.
  */
	initForm() {
		this.contactForm = this.fb.group({
      contato_nome: ['', Validators.required],
      contato_email: ['', [Validators.required, Validators.email]],
      contato_celular: ['', Validators.required],
      contato_telefone: [''],
      contato_sn_favorito: ['N'],
    });
	}

  onToggleFavorite(event: any) {
    const isFavorite = event.checked ? 'S' : 'N';
    this.contactForm.patchValue({
      contato_sn_favorito: isFavorite,
    });
  }

  setFormValues(contactData: Contact) {
    this.contact = contactData;

    this.contactForm.patchValue({
      contato_nome: contactData.contato_nome,
      contato_email: contactData.contato_email,
      contato_celular: contactData.contato_celular,
      contato_telefone: contactData.contato_telefone,
      contato_sn_favorito: contactData.contato_sn_favorito
    });
  }

  /**
   * When in edit mode will initialize the form data fetching the contact by id from api.
  */
  async loadContactData(id: string): Promise<void> {
    try {
      this.loading = true;
      const contactData = await firstValueFrom(this.contactsService.getContactById(id));

      if (contactData)
        this.setFormValues(contactData);

    } catch (err) {

      const contactData = this.contactsService.getContactByIdFromCache(id);

      if (contactData)
        this.setFormValues(contactData);

      this.snackBar.open('Erro ao carregar os dados do contato, dados inicializados com o mockup!', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }
  }

  

  /**
   * Handles the form submission for creating or updating a contact.
   *
   * Validates the form, checks if the phone number is valid, and either updates
   * or creates contact.
   *
   * @returns A Promise that resolves when the submission process is complete.
  */
  async onSubmit(): Promise<void> {

    try {
      
      if (this.contactForm.invalid) return;

      this.loading = true;

      const formData = this.contactForm.value;

      let contact_id = this.contact.contato_id || null;

      const validPhone = await firstValueFrom(this.contactsService.checkValidPhoneNumber(formData.contato_celular, contact_id));
      if (!validPhone) throw ({message: 'O número de telefone já está cadastrado!'});

      let response = null;
      let responseMessage = '';
      
      if (this.editMode) {
        responseMessage = 'Contato atualizado com sucesso!';
        formData.contato_id = this.contact.contato_id;
        response = await firstValueFrom(this.contactsService.update(formData));
      } else {
        responseMessage = 'Contato cacadastrado com sucesso!';
        response = await firstValueFrom(this.contactsService.create(formData));
      }

      this.snackBar.open(responseMessage, 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });

    } catch (err: any) {

        setTimeout(() => {

          let errorMessage = 'Ocorreu um erro ao tentar enviar os dados!';

          if (err && err.message) 
            errorMessage = err.message;

          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

        }, 500);

    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 300);
    }
  }
  
}
