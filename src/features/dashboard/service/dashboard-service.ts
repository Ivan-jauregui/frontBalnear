import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/dto/UserResponse';



@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    private http = inject(HttpClient);
    //cambiar el nombre a una variable que se agarre del login de los owners
    private apiUrl = "http://localhost:8080/api/v1/dashboard";

    getClients(): Observable<UserResponse[]>{
      return this.http.get<UserResponse[]>(`${this.apiUrl}`)
    }

}
