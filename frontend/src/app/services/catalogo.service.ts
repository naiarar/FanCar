import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private http: HttpClient) {}

  public carros() {
    return this.http.get(
      '/api/carros/',
    );
  }

  public carro(id:string) {
    return this.http.get(
      '/api/carros/'+id+'/',
    );
  }

  public excluirCarro(id: string) {
    return this.http.delete(
      '/api/carros/'+id+'/'
    );
  }

  public criarCarro(carro: any) {
    return this.http.post(
      '/api/carros/',
      carro
    );
  }

  public atualizarCarro(id: string, carro: any) {
    return this.http.put(
      '/api/carros/'+id+'/',
      carro
    );
  }

}
