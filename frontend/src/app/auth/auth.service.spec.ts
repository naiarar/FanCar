import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('começa deslogado sem tokens salvos', () => {
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getToken()).toBeNull();
  });

  it('salva os tokens no login', () => {
    service.login('admin', 'senha').subscribe();

    const req = http.expectOne(`${environment.apiUrl}/token/`);
    expect(req.request.body).toEqual({ username: 'admin', password: 'senha' });
    req.flush({ access: 'a1', refresh: 'r1' });

    expect(service.isLoggedIn()).toBe(true);
    expect(service.getToken()).toBe('a1');
  });

  it('renova o access token mantendo o refresh', () => {
    service.login('admin', 'senha').subscribe();
    http.expectOne(`${environment.apiUrl}/token/`).flush({ access: 'a1', refresh: 'r1' });

    let novoToken = '';
    service.renovarToken().subscribe((token) => (novoToken = token));
    const req = http.expectOne(`${environment.apiUrl}/token/refresh/`);
    expect(req.request.body).toEqual({ refresh: 'r1' });
    req.flush({ access: 'a2' });

    expect(novoToken).toBe('a2');
    expect(service.getToken()).toBe('a2');
  });

  it('limpa a sessão e redireciona no logout', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    service.login('admin', 'senha').subscribe();
    http.expectOne(`${environment.apiUrl}/token/`).flush({ access: 'a1', refresh: 'r1' });

    service.logout();

    expect(service.isLoggedIn()).toBe(false);
    expect(localStorage.length).toBe(0);
    expect(navigate).toHaveBeenCalledWith(['/login']);
  });
});
