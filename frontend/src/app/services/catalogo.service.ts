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
}
