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
      foto: new FormControl(null),
      fotoToUpload: new FormControl(null),
    });

    if (this.id) {
      this.catalogoService.carro(this.id)
        .pipe(first())
        .subscribe(result => {
          this.carroForm.patchValue(result)
        })
    }
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    if (file) {
      this.carroForm.patchValue({ foto: file })
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

  private formData() {
    const formData = new FormData();
    formData.append("nome_carro", this.carroForm.value.nome_carro);
    formData.append("marca", this.carroForm.value.marca)
    formData.append("modelo", this.carroForm.value.modelo)
    formData.append("ano_fabricacao", this.carroForm.value.ano_fabricacao)
    formData.append("ano_modelo", this.carroForm.value.ano_modelo)
    formData.append("cor", this.carroForm.value.cor)
    formData.append("tipo_combustivel", this.carroForm.value.tipo_combustivel)
    formData.append("cambio", this.carroForm.value.cambio)
    formData.append("quilometragem", this.carroForm.value.quilometragem)
    formData.append("valor", this.carroForm.value.valor)
    formData.append("foto", this.carroForm.value.foto)

    return formData
  }

  private criarCarro() {
    this.catalogoService.criarCarro(this.formData())
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
      this.catalogoService.atualizarCarro(this.id, this.formData())
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
