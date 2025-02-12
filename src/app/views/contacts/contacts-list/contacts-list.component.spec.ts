import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Para mockar chamadas HTTP
import { ContactsListComponent } from './contacts-list.component'; 
import { ContactsService } from '../contacts.service'; // Certifique-se de importar o serviço
import { ContactSearchComponent } from '../../../shared/components/contact-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CustomButtonComponent } from '../../../shared/components/custom-button.component';
import { ListItemComponent } from '../../../shared/components/list-item.component';
import { LoaderComponent } from '../../../shared/components/loader.component';
import { ContactsRoutingModule } from '../contacts-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ListItemComponent,
        ContactSearchComponent,
        CustomButtonComponent,
        NoopAnimationsModule
      ], // Importando o módulo de teste do HttpClient
      declarations: [ContactsListComponent], // Declarando o componente
      providers: [
        ContactsService,
        provideNgxMask(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
