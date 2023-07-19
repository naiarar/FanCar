import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { DetalhesCarrosComponent } from '../carros/detalhes-carros/detalhes-carros.component';


@NgModule({
  declarations: [
    CatalogoComponent,
    DetalhesCarrosComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule
  ]
})
export class CatalogoModule { }
