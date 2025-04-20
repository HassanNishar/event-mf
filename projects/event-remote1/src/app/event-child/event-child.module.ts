import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventChildRoutingModule } from './event-child-routing.module';
import { EventChildComponent } from './event-child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/account/login/login.component';


@NgModule({
  declarations: [
    EventChildComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    EventChildRoutingModule,
    FormsModule,
  ]
})
export class EventChildModule { }
