import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Contact } from './contact.model';
import { ApiResponse } from '../../shared/models/api-response.model';
import { CONTACTS_CONTENT } from './contacts.mockup';

/**
 * Service responsible for managing contact-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'https://127.0.0.1:8080/api/v1/contato';

  private _items: Contact[] = [] as Contact[];
	activeItem: Contact = {} as Contact;

  defaultItems:Contact[] = CONTACTS_CONTENT;

  constructor(private http: HttpClient) { }
  
  get items(): Contact[] {
      return this._items;
  }

  set items(value: Contact[]) {
      this._items = value;
  }

  /**
   * Fetches all contacts from the API.
   * Executes a GET request to the configured API URL and updates the `items`
   * property if the response indicates success.
   *
   * @returns An Observable with the API response containing the contacts data.
   */
	fetchAll(): Observable<ApiResponse> {
			const requestUrl = this.apiUrl;
			
			return this.http.get<ApiResponse>(`${requestUrl}`, {}).pipe(
					map(
							(response: ApiResponse) => {
									if (response && response.status === 'success' && response.data) {
											this.items = response.data;
									}
									return response as ApiResponse;
							},
							catchError(err => {
									console.log(
											"Handling error locally and rethrowing it...",
											err
									);
								
									return throwError(err);
							})
					)
			);
	}

  /**
   * Return a contact by id.
   * @param id - Contact Id.
   * @returns An Observable containing the contact returned by the API
   */
  getContactById(id: number | string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }
  
  /**
   * Retorna um contato pelo seu ID.
   * Busca de uma lista da memoria do service, usado apenas para o mockup.
   * @param id - O identificador do contato.
   * @returns The contact found in the cache, or undefined if not found.
   */
  getContactByIdFromCache(id: number | string): Contact {
    return <Contact>this.items.find(item => id == item.contato_id);
  }

  /**
   * Creates a new contact.
   * @param contact - Contact data.
   * @returns An Observable containing the created contact.
   */
  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  /**
   * Updates an existing contact.
   * @param contact - Os dados do contato atualizado.
   * @returns An Observable containing the updated contact.
   */
  update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.contato_id}`, contact);
  }

  /**
   * Checks if a phone number is valid.
   * @param number - Contact Cell Phone.
   * @param contact_id - If the number belongs to the contact itself, it should return true.
   * @returns An Observable with a boolean true if is a valid number and false if not.
   */
  checkValidPhoneNumber(number: string, contact_id?: number | null): Observable<boolean> {
    let data = {
      number,
      contact_id
    }
    return this.http.post<boolean>(`${this.apiUrl}/check-phone-number`, data);
  }

}
