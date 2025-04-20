import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../service/ApiService';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: ApiService,
    public _router: Router,
  ) { }

  ngOnInit(): void {
    this.LoadGooglesignin();
  }

  LoadGooglesignin() {
    if (isPlatformBrowser(this.platformId)) {
      // const authToken = localStorage.getItem('EM-User-GG');
      // if (authToken) {
      //   this.autoLogin(authToken);
      // } else {
      this.loadGoogleSignIn();
      // }
    }
  }

  loadGoogleSignIn(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleGoogleLogin.bind(this),
    });

    // Render the Google Sign-In button
    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleGoogleLogin(response: any): void {
    const googleIdToken = response.credential;

    const credential = {
      //clientId: environment.googleClientId,
      credential: googleIdToken,
      //select_by: 'google',
    };

    this.service.loginWithGoogle(credential).subscribe(
      (data) => {
        localStorage.setItem('EM-User-GG', data.ggcred);
        // console.log(data.ggcred)
      },
      (error) => {
        //console.error(error.message);
        const errormsg = error.message == "loginvalidation" ? "Please enter valid username and Password" : "";
        alert(errormsg);
      }
    );
    //console.log(credential)
  }

  autoLogin(credential: any): void {
    console.log(credential)
    const ggcred = {
      //clientId: environment.googleClientId,
      credential: credential,
      //select_by: 'google',
    };
    this.service.loginWithGoogle(ggcred).subscribe(
      (data) => {
        this._router.navigate(['/home']);
      },
      (error) => {
        console.error('Auto-login failed', error);
        localStorage.removeItem('EM-User-GG');
        this._router.navigate(['/login']);
      }
    );
  }

  onSubmit(): void {
    if (this.username && this.password) {
      const loginData = {
        username: this.username,
        password: this.password,
        remember: false
      };

      this.service.login(loginData).subscribe(
        data => {
          if (data) {
            // this._router.navigate(['/auth/home']);
            alert("Login Success");
          }
        },
        error => {
          const errormsg = error.message == "loginvalidation" ? "Please enter valid username and Password" : "";
          alert(errormsg);
        }
      );
      // console.log('Login Data:', loginData);
    }
  }
}

