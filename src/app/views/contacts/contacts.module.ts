import { NgModule } from '@angular/core';
import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'; 
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactsFormComponent
  ],
  imports: [
    SharedModule,
    ContactsRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
  ],

})
export class ContactsModule { }
