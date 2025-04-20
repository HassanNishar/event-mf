import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public _router: Router,
    // private service: ApiService,
  ) { }

  logout() {
    localStorage.removeItem('EM-User-GG');
    sessionStorage.removeItem("EM-User");
    this._router.navigate(['event-remote1/login']);
  }

  Profile() {
    this._router.navigate(['profile']);
  }
}
