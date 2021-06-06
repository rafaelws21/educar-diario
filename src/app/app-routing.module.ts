import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    // loadChildren: './atos-normativo/atos-normativo.module#AtosNormativoModule',
  },
  // {
  //   path: 'arquivo',
  //   loadChildren: () => import('./arquivo/arquivo.module').then(m => m.ArquivoModule),
  //   // loadChildren: './atos-normativo/atos-normativo.module#AtosNormativoModule',
  // },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
