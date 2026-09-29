import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  const logado = signal(false);

  const executar = () =>
    TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url: '/admin/novo' } as RouterStateSnapshot),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: { isLoggedIn: logado } }],
    });
  });

  it('libera quem está logado', () => {
    logado.set(true);

    expect(executar()).toBe(true);
  });

  it('redireciona para o login guardando a rota de origem', () => {
    logado.set(false);

    const resultado = executar() as UrlTree;

    expect(resultado.toString()).toBe('/login?redirect=%2Fadmin%2Fnovo');
  });
});
