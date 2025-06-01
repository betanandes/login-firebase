import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dados',
    loadChildren: () => import('./dados/dados.module').then(m => m.DadosPageModule)
  },
  {
    path: '',
    redirectTo: 'dados',  // <- Aqui mudou de 'home' para 'dados'
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
