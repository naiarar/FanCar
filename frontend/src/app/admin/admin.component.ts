import { Component } from '@angular/core';
import { CatalogoService } from '../services/catalogo.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
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

  excluirCarro(id: string) {
    this.catalogoService.excluirCarro(id).subscribe(() => {
      this.carros = this.carros.filter((item: any) => item.id_carro !== id)
    });
  }
}
