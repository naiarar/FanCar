import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo.component';
import { DetalhesCarrosComponent } from '../carros/detalhes-carros/detalhes-carros.component';

const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path:':id', component: DetalhesCarrosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
