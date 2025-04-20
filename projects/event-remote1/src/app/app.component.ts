import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'event-remote1';
  formattedDate: string = '';

  async ngOnInit() {
    const utils = await import('event_shell/Utils');
    this.formattedDate = utils .formatDate(new Date());
  }

}
