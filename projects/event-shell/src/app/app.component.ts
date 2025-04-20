import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { formatDate } from './shared/utils';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'event-shell';

  async ngOnInit() {
    // console.log('Shell is exposing formatDate:', formatDate(new Date()));
  }
}
