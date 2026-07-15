import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userRegisterRequest } from '../../../../shared/dto/request/UserRegisterRequest';
import { UserLoginRequest } from '../../../../shared/dto/request/UserLoginRequest';
import { Observable } from 'rxjs';
import { AuthReponse } from '../../../../shared/dto/response/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    //cambiar el nombre a una variable que se agarre del login de los owners
    private apiUrl = "http://localhost:8080/api/v1/auth";

    register(userRegisterRequest:userRegisterRequest):Observable<AuthReponse>{
      return this.http.post<AuthReponse>(`${this.apiUrl}/login`,userRegisterRequest)
    }

    login(userLoginRequest:UserLoginRequest):Observable<AuthReponse>{
      return this.http.post<AuthReponse>(`${this.apiUrl}/login`,userLoginRequest)
    }

}
