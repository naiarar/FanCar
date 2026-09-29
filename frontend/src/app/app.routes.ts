import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  {
    path: 'catalogo',
    title: 'Catálogo | FanCar',
    loadComponent: () => import('./catalogo/catalogo.component').then((m) => m.CatalogoComponent),
  },
  {
    path: 'catalogo/:id',
    title: 'Detalhes | FanCar',
    loadComponent: () =>
      import('./catalogo/detalhes/detalhes-carros.component').then((m) => m.DetalhesCarrosComponent),
  },
  {
    path: 'contato',
    title: 'Contato | FanCar',
    loadComponent: () => import('./contato/contato.component').then((m) => m.ContatoComponent),
  },
  {
    path: 'login',
    title: 'Login | FanCar',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Admin | FanCar',
        loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'novo',
        title: 'Novo veículo | FanCar',
        loadComponent: () =>
          import('./admin/formulario/formulario.component').then((m) => m.FormularioComponent),
      },
      {
        path: ':id',
        title: 'Editar veículo | FanCar',
        loadComponent: () =>
          import('./admin/formulario/formulario.component').then((m) => m.FormularioComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'Página não encontrada | FanCar',
    loadComponent: () =>
      import('./nao-encontrada/nao-encontrada.component').then((m) => m.NaoEncontradaComponent),
  },
];
