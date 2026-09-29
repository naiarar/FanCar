import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('authInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  const authService = {
    isLoggedIn: vi.fn(),
    getToken: vi.fn(),
    renovarToken: vi.fn(),
    logout: vi.fn(),
  };
  const url = `${environment.apiUrl}/carros/`;

  beforeEach(() => {
    vi.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authService },
      ],
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('não envia Authorization sem token', () => {
    authService.getToken.mockReturnValue(null);

    http.get(url).subscribe();

    expect(backend.expectOne(url).request.headers.has('Authorization')).toBe(false);
  });

  it('envia o token nas chamadas da API', () => {
    authService.getToken.mockReturnValue('a1');

    http.get(url).subscribe();

    expect(backend.expectOne(url).request.headers.get('Authorization')).toBe('Bearer a1');
  });

  it('renova o token e repete a requisição após 401', () => {
    authService.getToken.mockReturnValue('expirado');
    authService.isLoggedIn.mockReturnValue(true);
    authService.renovarToken.mockReturnValue(of('novo'));
    let resposta: unknown;

    http.get(url).subscribe((r) => (resposta = r));
    backend.expectOne(url).flush(null, { status: 401, statusText: 'Unauthorized' });
    const repetida = backend.expectOne(url);
    repetida.flush([]);

    expect(repetida.request.headers.get('Authorization')).toBe('Bearer novo');
    expect(resposta).toEqual([]);
  });

  it('faz logout quando a renovação falha', () => {
    authService.getToken.mockReturnValue('expirado');
    authService.isLoggedIn.mockReturnValue(true);
    authService.renovarToken.mockReturnValue(throwError(() => new Error('refresh expirado')));

    http.get(url).subscribe({ error: () => undefined });
    backend.expectOne(url).flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(authService.logout).toHaveBeenCalled();
  });
});
