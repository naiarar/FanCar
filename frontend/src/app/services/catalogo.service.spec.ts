import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { CatalogoService } from './catalogo.service';

describe('CatalogoService', () => {
  let service: CatalogoService;
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/carros/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CatalogoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('lista ordenando por valor crescente', () => {
    service.carros().subscribe();

    http.expectOne(`${url}?ordering=valor`).flush([]);
  });

  it('lista em ordem decrescente com busca', () => {
    service.carros('desc', ' jeep ').subscribe();

    http.expectOne(`${url}?ordering=-valor&search=jeep`).flush([]);
  });

  it('atualiza com PATCH e exclui com DELETE', () => {
    service.atualizarCarro('abc', new FormData()).subscribe();
    service.excluirCarro('abc').subscribe();

    http.expectOne({ method: 'PATCH', url: `${url}abc/` }).flush({});
    http.expectOne({ method: 'DELETE', url: `${url}abc/` }).flush(null);
  });
});
