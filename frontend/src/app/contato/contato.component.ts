import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css',
})
export class ContatoComponent {
  readonly enviado = signal(false);

  readonly contatoForm = inject(NonNullableFormBuilder).group({
    nome: ['', Validators.required],
    assunto: ['', Validators.required],
    telefone: [''],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.maxLength(300)]],
  });

  onSubmit(): void {
    if (this.contatoForm.invalid) {
      this.contatoForm.markAllAsTouched();
      return;
    }
    this.enviado.set(true);
    this.contatoForm.reset();
  }
}
