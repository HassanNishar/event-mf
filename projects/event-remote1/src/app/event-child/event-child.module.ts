import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventChildRoutingModule } from './event-child-routing.module';
import { EventChildComponent } from './event-child.component';
import { LoginComponent } from './account/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    EventChildComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    EventChildRoutingModule,
    FormsModule,
  ]
})
export class EventChildModule { }
