import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicationResponse } from '../models/publication-response';
import { PublicationRequest } from '../models/publication-request';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private http = inject(HttpClient);
   private apiUrl = "http://localhost:8080/api/v1/publication";

  getAll(id:number):Observable <PublicationResponse[]>{
    return this.http.get<PublicationResponse[]>(`${this.apiUrl}/balneario/${id}`)
  }

  getById(id:number):Observable <PublicationResponse>{
    return this.http.get<PublicationResponse>(`${this.apiUrl}/${id}`)
  }

  save(req: PublicationRequest): Observable<PublicationRequest> {
    return this.http.post<PublicationRequest>(this.apiUrl,req);
  }
}
