import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventChildComponent } from './event-child.component';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: '/event-child', pathMatch: 'full' }, 
  { path: '', component: EventChildComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventChildRoutingModule { }
