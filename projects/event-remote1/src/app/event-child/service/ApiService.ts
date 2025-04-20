import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { userDecrypt, userEncrypt } from "./EncryptService";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiUrl = environment.apiUrl;
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private http: HttpClient,
        public _router: Router,
    ) { }

    getUserFromSessionStorage = () => {
        if (isPlatformBrowser(this.platformId)) {
            const existingUser = sessionStorage.getItem('EM-User');
            if (existingUser) {
                return userDecrypt(existingUser);
            }
        }
        return null;
    };

    getUserToken = () => {
        const currentUser = this.getUserFromSessionStorage();
        return currentUser ? currentUser.token : '';
    };

    login(data: any) {
        const url = this.apiUrl + '/token';
        return this.http.post<any>(url, data).pipe(
            map(data => {
                const encryptedData = userEncrypt(data);
                sessionStorage.setItem('EM-User', encryptedData);
                this._router.navigate(['/auth//home']);
                return data;
            }),
            catchError(error => {
                let errorMessage = 'Login failed';
                if (error.error && error.error.message) {
                    errorMessage = error.error.message;
                } else if (error.error) {
                    errorMessage = error.error;
                }
                // console.error('Login error occurred:', errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    loginWithGoogle(googleLoginModel: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/google-login`, googleLoginModel).pipe(
            map(data => {
                const newdata = userEncrypt(data);
                sessionStorage.setItem("EM-User", newdata);
                this._router.navigate(['/auth//home']);
                return data;
            }),
            catchError(error => {
                let errorMessage = 'Login failed';
                if (error.error && error.error.message) {
                    errorMessage = error.error.message;
                } else if (error.error) {
                    errorMessage = error.error;
                }

                // console.error('Login error:', errorMessage);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    createPassword(id: string, passwordData: any): Observable<any> {
        const userToken = sessionStorage.getItem('EM-User');
        const token = userDecrypt(userToken);

        if (!token || !token.token) {
            console.error("Error: Token is missing or invalid.");
            return throwError(() => new Error('Token is missing or invalid.'));
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token.token}`);
        console.log("Headers:", headers);

        return this.http.put<any>(`${this.apiUrl}/createpassword/${id}`, passwordData, { headers }).pipe(
            map(response => {
                console.log('Password creation response:', response);
                return response;
            }),
            catchError(error => {
                let errorMessage = 'Password creation failed';
                if (error.error && error.error.message) {
                    errorMessage = error.error.message;
                } else if (error.error) {
                    errorMessage = error.error;
                }

                console.error("Error details:", error);
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    logout() {
        localStorage.removeItem('EM-User-GG');
        sessionStorage.removeItem("EM-User");
        this._router.navigate(['/auth/login']);
    }
}