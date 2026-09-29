import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const authService = { login: vi.fn() };
  let navigateByUrl: ReturnType<typeof vi.spyOn>;

  const criar = () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const componente = fixture.componentInstance;
    componente.loginForm.setValue({ username: 'admin', password: 'senha' });
    return componente;
  };

  beforeEach(() => {
    vi.resetAllMocks();
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: authService }],
    });
    navigateByUrl = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
  });

  it('entra e vai para o admin', () => {
    authService.login.mockReturnValue(of(undefined));

    criar().onSubmit();

    expect(authService.login).toHaveBeenCalledWith('admin', 'senha');
    expect(navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('avisa quando as credenciais são inválidas', () => {
    authService.login.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 401 })));
    const componente = criar();

    componente.onSubmit();

    expect(componente.erro()).toBe('Usuário ou senha inválidos.');
    expect(navigateByUrl).not.toHaveBeenCalled();
  });
});
