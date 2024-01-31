import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {

  constructor(private http: HttpClient) {}

  public carros(atributo = 'valor', orderbyasc = true) {
    return this.http.get(
      '/api/carros/?ordering='+(orderbyasc? atributo: '-' + atributo),
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
    return this.http.patch(
      '/api/carros/'+id+'/',
      carro
    );
  }



}
