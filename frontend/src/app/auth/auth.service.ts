import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { environment } from '../../environments/environment';

export interface Tokens {
  access: string;
  refresh: string;
}

const CHAVE_TOKENS = 'fancar.tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokens = signal<Tokens | null>(this.lerTokens());

  readonly isLoggedIn = computed(() => this.tokens() !== null);

  login(username: string, password: string): Observable<void> {
    return this.http
      .post<Tokens>(`${environment.apiUrl}/token/`, { username, password })
      .pipe(
        tap((tokens) => this.salvarTokens(tokens)),
        map(() => undefined),
      );
  }

  renovarToken(): Observable<string> {
    return this.http
      .post<{ access: string }>(`${environment.apiUrl}/token/refresh/`, {
        refresh: this.tokens()?.refresh,
      })
      .pipe(
        tap(({ access }) => this.salvarTokens({ ...this.tokens()!, access })),
        map(({ access }) => access),
      );
  }

  logout(): void {
    localStorage.removeItem(CHAVE_TOKENS);
    this.tokens.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokens()?.access ?? null;
  }

  private salvarTokens(tokens: Tokens): void {
    localStorage.setItem(CHAVE_TOKENS, JSON.stringify(tokens));
    this.tokens.set(tokens);
  }

  private lerTokens(): Tokens | null {
    try {
      const tokens = JSON.parse(localStorage.getItem(CHAVE_TOKENS) ?? 'null');
      return tokens?.access && tokens?.refresh ? tokens : null;
    } catch {
      return null;
    }
  }
}
