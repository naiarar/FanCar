import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';

import { CAMBIOS, COMBUSTIVEIS } from '../../models/carro';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-detalhes-carros',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './detalhes-carros.component.html',
  styleUrl: './detalhes-carros.component.css',
})
export class DetalhesCarrosComponent {
  private readonly catalogoService = inject(CatalogoService);

  readonly id = input.required<string>();
  readonly naoEncontrado = signal(false);
  readonly combustiveis = COMBUSTIVEIS;
  readonly cambios = CAMBIOS;

  readonly carro = toSignal(
    toObservable(this.id).pipe(
      tap(() => this.naoEncontrado.set(false)),
      switchMap((id) =>
        this.catalogoService.carro(id).pipe(
          catchError(() => {
            this.naoEncontrado.set(true);
            return of(undefined);
          }),
        ),
      ),
    ),
  );
}
