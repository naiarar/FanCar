import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: { class: 'page' },
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  readonly isLogged = this.authService.isLoggedIn;
  readonly ano = new Date().getFullYear();

  logout(): void {
    this.authService.logout();
  }
}
