import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WondersComponent } from './wonders/wonders.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wonders',
    pathMatch: 'full'
  }, {
    path: 'wonders',
    component: WondersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
