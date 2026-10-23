import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/dto/response/UserResponse';
import { SolicitudeResponse } from '../../solicitude/models/solicitude-response';
import { BalnearioResponse } from '../../balneario/models/balnearioResponse';




@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    private http = inject(HttpClient);

    private apiUrl = "http://localhost:8080/api/v1/dashboard";

    getSeaSideResortByOwner(): Observable<BalnearioResponse>{
      return this.http.get<BalnearioResponse>(`${this.apiUrl}/owner`)
    }

    getAllSolicitude(id:number):Observable<SolicitudeResponse[]>{
      return this.http.get<SolicitudeResponse[]>(this.apiUrl+"/solicitude/balneario/"+id)
    }

    getByIdSolicitude(id:number):Observable<SolicitudeResponse>{
      //return this.http.get<SolicitudeResponse>(this.apiUrl+"/solicitude"+id)
      return this.http.get<SolicitudeResponse>(this.apiUrl+"/solicitude/detail/"+id)
    }

    getClients(): Observable<UserResponse[]>{
      return this.http.get<UserResponse[]>(`${this.apiUrl}`)
    }

}
