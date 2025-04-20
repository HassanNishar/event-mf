import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventChildRoutingModule } from './event-child-routing.module';
import { EventChildComponent } from './event-child.component';


@NgModule({
  declarations: [
    EventChildComponent
  ],
  imports: [
    CommonModule,
    EventChildRoutingModule
  ]
})
export class EventChildModule { }
