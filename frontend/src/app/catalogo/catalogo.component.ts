import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Carro } from '../models/carro';
import { CatalogoService, Ordem } from '../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  imports: [CurrencyPipe, DecimalPipe, FormsModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {
  private readonly catalogoService = inject(CatalogoService);

  readonly carros = signal<Carro[]>([]);
  readonly ordem = signal<Ordem>('asc');
  readonly carregando = signal(true);
  readonly erro = signal(false);
  busca = '';

  constructor() {
    this.carregar();
  }

  pesquisar(): void {
    this.carregar();
  }

  alternarOrdem(): void {
    this.ordem.update((ordem) => (ordem === 'asc' ? 'desc' : 'asc'));
    this.carregar();
  }

  private carregar(): void {
    this.carregando.set(true);
    this.erro.set(false);
    this.catalogoService.carros(this.ordem(), this.busca).subscribe({
      next: (carros) => {
        this.carros.set(carros);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }
}
