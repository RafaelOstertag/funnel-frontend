import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedlistComponent } from './feedlist/feedlist.component'

const routes: Routes = [
  { path: 'list', component: FeedlistComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
