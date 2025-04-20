import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventChildComponent } from './event-child.component';
import { LoginComponent } from './components/account/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // { path: '', redirectTo: '/event-child', pathMatch: 'full' }, 
  // { path: '', component: EventChildComponent },
  // { path: '', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventChildRoutingModule { }
