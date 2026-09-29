import { KeyValuePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CAMBIOS, COMBUSTIVEIS } from '../../models/carro';
import { CatalogoService } from '../../services/catalogo.service';

const ANO_MAXIMO = new Date().getFullYear() + 1;

const ROTULOS: Record<string, string> = {
  nome_carro: 'Nome do carro',
  marca: 'Marca',
  modelo: 'Modelo',
  ano_fabricacao: 'Ano de fabricação',
  ano_modelo: 'Ano do modelo',
  cor: 'Cor',
  tipo_combustivel: 'Combustível',
  cambio: 'Câmbio',
  quilometragem: 'Quilometragem',
  valor: 'Valor',
  foto: 'Foto',
};

@Component({
  selector: 'app-formulario',
  imports: [KeyValuePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent implements OnInit {
  private readonly catalogoService = inject(CatalogoService);
  private readonly router = inject(Router);

  readonly id = input<string>();
  readonly combustiveis = COMBUSTIVEIS;
  readonly cambios = CAMBIOS;
  readonly anoMaximo = ANO_MAXIMO;
  readonly fotoAtual = signal<string | null>(null);
  readonly enviando = signal(false);
  readonly erros = signal<string[]>([]);
  private foto: File | null = null;

  readonly carroForm = inject(NonNullableFormBuilder).group({
    nome_carro: ['', [Validators.required, Validators.maxLength(30)]],
    marca: ['', [Validators.required, Validators.maxLength(30)]],
    modelo: ['', [Validators.required, Validators.maxLength(30)]],
    ano_fabricacao: [ANO_MAXIMO - 1, [Validators.required, Validators.min(1900), Validators.max(ANO_MAXIMO)]],
    ano_modelo: [ANO_MAXIMO - 1, [Validators.required, Validators.min(1900), Validators.max(ANO_MAXIMO)]],
    cor: ['', [Validators.required, Validators.maxLength(30)]],
    tipo_combustivel: ['', Validators.required],
    cambio: ['', Validators.required],
    quilometragem: [0, [Validators.required, Validators.min(0)]],
    valor: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.catalogoService.carro(id).subscribe({
        next: ({ foto, ...carro }) => {
          this.carroForm.patchValue(carro);
          this.fotoAtual.set(foto);
        },
        error: () => this.erros.set(['Veículo não encontrado.']),
      });
    }
  }

  invalido(campo: keyof typeof this.carroForm.controls): boolean {
    const controle = this.carroForm.controls[campo];
    return controle.invalid && (controle.touched || controle.dirty);
  }

  onFileSelected(event: Event): void {
    this.foto = (event.target as HTMLInputElement).files?.[0] ?? null;
  }

  onSubmit(): void {
    if (this.carroForm.invalid) {
      this.carroForm.markAllAsTouched();
      return;
    }
    const id = this.id();
    const requisicao = id
      ? this.catalogoService.atualizarCarro(id, this.formData())
      : this.catalogoService.criarCarro(this.formData());

    this.enviando.set(true);
    this.erros.set([]);
    requisicao.subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (erro: HttpErrorResponse) => {
        this.enviando.set(false);
        this.erros.set(this.mensagensDeErro(erro));
      },
    });
  }

  private formData(): FormData {
    const formData = new FormData();
    Object.entries(this.carroForm.getRawValue()).forEach(([campo, valor]) =>
      formData.append(campo, String(valor)),
    );
    if (this.foto) {
      formData.append('foto', this.foto);
    }
    return formData;
  }

  private mensagensDeErro(erro: HttpErrorResponse): string[] {
    if (erro.status === 400 && erro.error && typeof erro.error === 'object') {
      return Object.entries(erro.error).map(
        ([campo, mensagens]) => `${ROTULOS[campo] ?? campo}: ${([] as string[]).concat(mensagens as string[]).join(' ')}`,
      );
    }
    return ['Não foi possível salvar o veículo. Tente novamente.'];
  }
}
