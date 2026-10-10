import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/dto/response/UserResponse';
import { SolicitudeResponse } from '../../solicitude/models/solicitude-response';




@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    private http = inject(HttpClient);
    //Termporalmente comentado para poner json-server
    //private apiUrl = "http://localhost:8080/api/v1/dashboard";
    private apiUrl = "http://localhost:5000/solicitude";

    getClients(): Observable<UserResponse[]>{
      return this.http.get<UserResponse[]>(`${this.apiUrl}`)
    }

    getAllSolicitude():Observable<SolicitudeResponse[]>{
      //return this.http.get<SolicitudeResponse[]>(this.apiUrl+"/solicitude")
      return this.http.get<SolicitudeResponse[]>(this.apiUrl)
    }

    getByIdSolicitude(id:number):Observable<SolicitudeResponse>{
      //return this.http.get<SolicitudeResponse>(this.apiUrl+"/solicitude"+id)
      return this.http.get<SolicitudeResponse>(this.apiUrl+"/"+id)
    }

}
