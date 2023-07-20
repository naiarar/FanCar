import { CatalogoService } from 'src/app/services/catalogo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  carroForm: FormGroup;
  id: string | null
  isAddMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private catalogoService: CatalogoService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id

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

    if (this.id) {
      this.catalogoService.carro(this.id)
        .pipe(first())
        .subscribe(result => {
          this.carroForm.patchValue(result)
        })
    }
  }
  onSubmit() {
    if (this.carroForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.criarCarro();
    } else {
      this.atualizarCarro();
    }
  }

  private criarCarro() {
    this.catalogoService.criarCarro(this.carroForm.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: error => {
            console.log(error)
          }
      });
  }

  private atualizarCarro() {
    if (this.id) {
      this.catalogoService.atualizarCarro(this.id, this.carroForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
              console.log(error)
            }
        });
    }
  }
}
