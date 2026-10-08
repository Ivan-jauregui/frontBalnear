import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudeResponse } from '../models/solicitude-response';
import { SolicitudeRequest } from '../models/solicitude-request';

@Injectable({
  providedIn: 'root',
})
export class SolicitudeService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/v1/solicitude";


  save(req:SolicitudeRequest):Observable<SolicitudeResponse>{
    return this.http.post<SolicitudeResponse>(this.apiUrl,req)
  }

  getAll():Observable<SolicitudeResponse[]>{
    return this.http.get<SolicitudeResponse[]>(this.apiUrl)
  }

   getById(id:number):Observable<SolicitudeResponse>{
    return this.http.get<SolicitudeResponse>(this.apiUrl+"/"+id)
  }
}
