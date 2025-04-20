import { Component, OnInit } from '@angular/core';
import { formatDate } from './shared/utils';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'event-shell';
  isLoggedIn: boolean = false;

  async ngOnInit() {
    await this.fakeInitDelay(2000);

    const splash = document.getElementById('splash-screen');
    if (splash) {
      // this.isLoggedIn = true;
      if(sessionStorage.getItem('EM-User')){
        this.isLoggedIn = true;
      }
      splash.style.display = 'none';
    }
  }

  private fakeInitDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
