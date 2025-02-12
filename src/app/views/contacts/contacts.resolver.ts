import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContactsService } from './contacts.service';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolver implements Resolve<ApiResponse> {
  constructor(private contactsService: ContactsService) {}

  /**
   * @returns An Observable with the API response containing the contacts data.
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiResponse> {
    return this.contactsService.fetchAll().pipe(
        catchError((error) => {
            this.contactsService.items = this.contactsService.defaultItems;
            return of({} as ApiResponse);
        })
    );
  }
}
