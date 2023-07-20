import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-detalhes-carros',
  templateUrl: './detalhes-carros.component.html',
  styleUrls: ['./detalhes-carros.component.css']
})
export class DetalhesCarrosComponent {

  carro: any
  constructor(private route: ActivatedRoute,
    private catalogoService: CatalogoService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.catalogoService.carro(id).subscribe(result => {
        this.carro = result
      })
    }

  }

}
