import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsResolver } from './contacts.resolver';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsListComponent,
    resolve: {
      contacts: ContactsResolver
    }
  },
  {
    path: 'create',
    component: ContactsFormComponent
  },
  {
    path: 'update/:id',
    component: ContactsFormComponent,
    resolve: {
      contacts: ContactsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
