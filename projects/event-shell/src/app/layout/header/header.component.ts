import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
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
    this._router.navigate(['auth//login']);
  }

  Profile() {
    this._router.navigate(['profile']);
  }
}
