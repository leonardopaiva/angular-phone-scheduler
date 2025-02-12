import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importando o HttpClientTestingModule
import { of } from 'rxjs';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Adicionando o HttpClientTestingModule aqui
      providers: [ContactsService],
    });
    service = TestBed.inject(ContactsService); // Inicia o serviço
  });

  it('should have a method checkValidPhoneNumber', () => {
    // Verifica se o método checkValidPhoneNumber existe no serviço
    expect(service.checkValidPhoneNumber).toBeDefined();
    expect(typeof service.checkValidPhoneNumber).toBe('function');
  });

});
