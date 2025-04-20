import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/event-child', pathMatch: 'full' },
  { path: 'event-child', loadChildren: () => import('./event-child/event-child.module').then(m => m.EventChildModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
