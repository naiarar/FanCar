import { CatalogoService } from 'src/app/services/catalogo.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  public carroForm!: FormGroup;
  carro: any
  isAddMode: boolean;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private catalogoService: CatalogoService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !id
    if (id) {
      this.catalogoService.carro(id)
      .pipe(first()).subscribe(result => {
        this.carro = result
        console.log(result)
        this.carroForm.patchValue(result)
      })
    }

  }

  ngOnInit() {
    this.carroForm = this.formBuilder.group({
      nome_carro: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      ano_fabricacao: new FormControl('', Validators.required),
      ano_modelo: new FormControl('', Validators.required),
      cor: new FormControl('', Validators.required),
      tipo_combustivel: new FormControl('', Validators.required),
      cambio: new FormControl('', Validators.required),
      quilometragem: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
  }
}
