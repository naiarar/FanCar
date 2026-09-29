import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CAMBIOS, COMBUSTIVEIS, Carro } from '../models/carro';
import { CatalogoService, Ordem } from '../services/catalogo.service';

@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  private readonly catalogoService = inject(CatalogoService);

  readonly carros = signal<Carro[]>([]);
  readonly ordem = signal<Ordem>('asc');
  readonly erro = signal<string | null>(null);
  readonly combustiveis = COMBUSTIVEIS;
  readonly cambios = CAMBIOS;

  constructor() {
    this.carregar();
  }

  alternarOrdem(): void {
    this.ordem.update((ordem) => (ordem === 'asc' ? 'desc' : 'asc'));
    this.carregar();
  }

  excluirCarro(carro: Carro): void {
    if (!confirm(`Excluir ${carro.marca} ${carro.nome_carro}?`)) {
      return;
    }
    this.catalogoService.excluirCarro(carro.id_carro).subscribe({
      next: () => this.carros.update((carros) => carros.filter((c) => c.id_carro !== carro.id_carro)),
      error: () => this.erro.set('Não foi possível excluir o veículo.'),
    });
  }

  private carregar(): void {
    this.catalogoService.carros(this.ordem()).subscribe({
      next: (carros) => this.carros.set(carros),
      error: () => this.erro.set('Não foi possível carregar os veículos.'),
    });
  }
}
