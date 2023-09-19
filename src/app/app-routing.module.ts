import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./functions/login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./functions/home/home-routing.module').then(m => m.HomeRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
