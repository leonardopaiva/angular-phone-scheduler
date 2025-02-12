import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://127.0.0.1:8080/api/v1/auth';

  constructor(
		private http: HttpClient,
		private router: Router,
		private snackBar: MatSnackBar,
	) { }

  /**
   * Fetches api and check if the user is logged validating the token.
   * @returns boolean.
   */
  check(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-logged-in`);
  }

  /**
   * Used by the auth.guard to force user out of protected routes
   */
	logout(message?: string) {
		if (message) {
			this.snackBar.open(message, 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
		}
		this.router.navigate(['/about']);  
	}

}
