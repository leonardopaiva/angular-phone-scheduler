import { NgModule } from '@angular/core';
import { ContactSearchComponent } from './components/contact-search.component';
import { CustomButtonComponent } from './components/custom-button.component';
import { ListItemComponent } from './components/list-item.component';
import { LoaderComponent } from './components/loader.component';


@NgModule({
  imports: [
    ListItemComponent,
    ContactSearchComponent,
    CustomButtonComponent,
    LoaderComponent
  ],
  exports: [
    ListItemComponent,
    ContactSearchComponent,
    CustomButtonComponent,
    LoaderComponent
  ]
})
export class SharedComponentsModule { }
