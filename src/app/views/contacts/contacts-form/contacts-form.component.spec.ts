import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsFormComponent } from './contacts-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { ContactSearchComponent } from '../../../shared/components/contact-search.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button.component';
import { ListItemComponent } from '../../../shared/components/list-item.component';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoaderComponent } from '../../../shared/components/loader.component';
import { Contact } from '../contact.model';
import { of } from 'rxjs';

const mockActivatedRoute = {
  snapshot: { paramMap: { get: () => '1' } },
  paramMap: of(new Map([['id', '1']]))
};

describe('ContactsFormComponent', () => {
  let component: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;

  class ContactsServiceStub {
    getContactById(id: string) {
      const contact: Contact = {
        contato_id: Number(id),
        contato_nome: 'Contato Teste',
        contato_email: 'teste@example.com',
        contato_celular: '11912345678',
        contato_telefone: '1123456789',
        contato_sn_favorito: 'S',
        contato_sn_ativo: 'S',
        contato_dh_cad: new Date()
      };
      return of(contact);
    }

    checkValidPhoneNumber(phone: string) {
      return of(false);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ListItemComponent,
        ContactSearchComponent,
        CustomButtonComponent,
        NoopAnimationsModule,
        MatInputModule, 
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSlideToggleModule,
        LoaderComponent
      ],
      declarations: [ContactsFormComponent],
      providers: [
        { provide: ContactsService, useClass: ContactsServiceStub },
        provideNgxMask(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsFormComponent);
    component = fixture.componentInstance;

    const activatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('1');

    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contact data when in edit mode', async () => {
    await component.loadContactData('1'); 
    
    fixture.detectChanges();

    expect(component.editMode).toBeTrue();
    expect(component.contactForm.get('contato_nome')?.value).toBe('Contato Teste');
  });

  it('should call checkValidPhoneNumber when onSubmit is called', async () => {
    const mockContactsService = TestBed.inject(ContactsService);

    const checkValidPhoneNumberSpy = spyOn(mockContactsService, 'checkValidPhoneNumber').and.callThrough();

    component.contactForm.patchValue({
      contato_nome: 'Novo Contato',
      contato_email: 'novocontato@example.com',
      contato_celular: '11912345678',
      contato_telefone: '1123456789',
      contato_sn_favorito: 'N',
    });

    await component.onSubmit();

    expect(checkValidPhoneNumberSpy).toHaveBeenCalledOnceWith('11912345678', 1);
  });


});
