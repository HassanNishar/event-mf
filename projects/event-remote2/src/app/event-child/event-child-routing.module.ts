import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventChildComponent } from './event-child.component';

const routes: Routes = [{ path: '', component: EventChildComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventChildRoutingModule { }
