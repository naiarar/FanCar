import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Carro } from '../models/carro';

export type Ordem = 'asc' | 'desc';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/carros/`;

  carros(ordem: Ordem = 'asc', busca = ''): Observable<Carro[]> {
    let params = new HttpParams().set('ordering', ordem === 'asc' ? 'valor' : '-valor');
    if (busca.trim()) {
      params = params.set('search', busca.trim());
    }
    return this.http.get<Carro[]>(this.url, { params });
  }

  carro(id: string): Observable<Carro> {
    return this.http.get<Carro>(`${this.url}${id}/`);
  }

  criarCarro(carro: FormData): Observable<Carro> {
    return this.http.post<Carro>(this.url, carro);
  }

  atualizarCarro(id: string, carro: FormData): Observable<Carro> {
    return this.http.patch<Carro>(`${this.url}${id}/`, carro);
  }

  excluirCarro(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}/`);
  }
}
