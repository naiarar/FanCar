import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {
  const logado = signal(false);
  const authService = { isLoggedIn: logado, logout: vi.fn() };

  const renderizar = () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: authService }],
    });
  });

  it('mostra Login e esconde Admin para visitantes', () => {
    logado.set(false);

    const menu = renderizar().querySelector('nav')!.textContent!;

    expect(menu).toContain('Login');
    expect(menu).not.toContain('Admin');
  });

  it('mostra Admin e Sair para quem está logado', () => {
    logado.set(true);
    const elemento = renderizar();

    expect(elemento.querySelector('nav')!.textContent).toContain('Admin');
    (elemento.querySelector('nav button') as HTMLButtonElement).click();

    expect(authService.logout).toHaveBeenCalled();
  });
});
