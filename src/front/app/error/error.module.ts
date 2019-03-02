import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';

const routes: Routes = [{
  path: '',
  component: ErrorComponent
}]

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ErrorModule { }
