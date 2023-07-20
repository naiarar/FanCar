import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClient } from './auth.client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  public isLoggedIn: boolean;
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authClient: AuthClient,
    private router: Router
  ) {
    let token = localStorage.getItem(this.tokenKey);
    this.isLoggedIn = token != null && token.length > 0;
  }

  public login(username: string, password: string): void {
    this.authClient.login(username, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token);
      this.toggleIsLoggedIn()
      this.router.navigate(['/']);
    });
  }

  toggleIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn
    this.isLoggedInChange.next(this.isLoggedIn);
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.toggleIsLoggedIn()
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    if (this.isLoggedIn) {
      const tokenString = localStorage.getItem(this.tokenKey)
      if (tokenString) {
        const tokenParsed = JSON.parse(tokenString)
        return tokenParsed.access
      }
    }
    return null;
  }
}
