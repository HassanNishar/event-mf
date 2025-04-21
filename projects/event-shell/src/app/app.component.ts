import { Component, OnInit } from '@angular/core';
import { formatDate } from './shared/utils';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'event-shell';
  isLoggedIn: boolean = false;
  isLoginPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url.includes('/login');
        const user = sessionStorage.getItem('EM-User');
        this.isLoggedIn = !!user && !this.isLoginPage;

        const splash = document.getElementById('splash-screen');
        if (splash) {
          splash.style.display = 'none';
        }
      }
    });
  }

  // await this.fakeInitDelay(1500);
  private fakeInitDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}