import { Subject } from "rxjs";

export class MockAuthService {
  private tokenKey = 'token';
  public isLoggedIn = true;
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();


  public login(username: string, password: string): void {
    this.toggleIsLoggedIn()
  }

  toggleIsLoggedIn() {
    this.isLoggedIn = !this.isLoggedIn
    this.isLoggedInChange.next(this.isLoggedIn);
  }

  public logout() {
    this.toggleIsLoggedIn()
  }

  public getToken(): string | null {
    if (this.isLoggedIn) {
      return this.tokenKey
    }
    return null;
  }
}
