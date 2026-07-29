import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { userRegisterRequest } from '../../../shared/dto/request/UserRegisterRequest';
import { UserLoginRequest } from '../../../shared/dto/request/UserLoginRequest';
import { Observable,switchMap,tap } from 'rxjs';
import { AuthReponse } from '../../../shared/dto/response/AuthResponse';
import { UserResponse } from '../../../shared/dto/response/UserResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<UserResponse | null>(null);

  private apiUrl = "http://localhost:8080/api/v1/auth";

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  saveTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  register(userRegisterRequest: userRegisterRequest): Observable<UserResponse> {
    return this.http.post<AuthReponse>(`${this.apiUrl}/register`, userRegisterRequest).pipe(
      tap((response) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      }),
     switchMap(() => this.fetchCurrentUser()) 
    )
    
  }

  login(userLoginRequest: UserLoginRequest): Observable<UserResponse> {
    return this.http.post<AuthReponse>(`${this.apiUrl}/login`, userLoginRequest).pipe(
      tap((response) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      }),
     switchMap(() => this.fetchCurrentUser()) 
    );
  }

  fetchCurrentUser(): Observable<UserResponse> {
  return this.http.get<UserResponse>('http://localhost:8080/api/v1/user/me').pipe(
    tap(user => this.currentUser.set(user))
  )
}

  refreshToken(): Observable<AuthReponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthReponse>(`${this.apiUrl}/refresh-token`,{ refreshToken }).pipe(
      tap((response) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  // Verificacion para ver si tiene el role
  hasAnyRole(requiredRoles:string[]):boolean{
    const user = this.currentUser();
    if (!user || !user.roles) return false;
    return user.roles.some(role=>requiredRoles.includes(role.name));
  }
}
