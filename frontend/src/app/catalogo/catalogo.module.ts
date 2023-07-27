import { CommonModule } from '@angular/common';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { DetalhesCarrosComponent } from './detalhes/detalhes-carros.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    CatalogoComponent,
    DetalhesCarrosComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule
  ],
})
export class CatalogoModule { }
