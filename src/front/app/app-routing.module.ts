import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '', loadChildren: './home/home.module#HomeModule'
}, {
  path: 'admin', loadChildren: './admin/admin.module#AdminModule'
}, {
  path: '**', loadChildren: './error/error.module#ErrorModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
