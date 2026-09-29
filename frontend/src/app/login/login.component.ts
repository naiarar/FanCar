import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly redirect = input<string>();
  readonly enviando = signal(false);
  readonly erro = signal<string | null>(null);

  readonly loginForm = inject(NonNullableFormBuilder).group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { username, password } = this.loginForm.getRawValue();
    this.enviando.set(true);
    this.erro.set(null);
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigateByUrl(this.redirect() || '/admin'),
      error: (erro) => {
        this.enviando.set(false);
        this.erro.set(
          erro.status === 401 ? 'Usuário ou senha inválidos.' : 'Não foi possível conectar à API.',
        );
      },
    });
  }
}
