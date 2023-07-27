import { Component } from '@angular/core';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  carros: any
  orderbyasc : boolean
  constructor(private catalogoService: CatalogoService) {
    this.orderbyasc = true
    this.getCarros()
  }

  getCarros (){
    this.catalogoService.carros('valor',this.orderbyasc).subscribe(result => {
      this.carros = result
    })
  }

  ordenaCarros (){
    this.orderbyasc = !this.orderbyasc
    this.getCarros()
  }
}
