import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BalnearioResponse } from '../models/balnearioResponse';
import { BalnearioRequest } from '../models/balnearioRequest';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalnearioService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/v1/balnearios";

  getAll(): Observable<BalnearioResponse[]> {
    return this.http.get<BalnearioResponse[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error en el flujo de datos de proyectos:', error);
        return throwError(() => new Error('No se pudieron recuperar los proyectos. Reintente más tarde.'));
      })
    );
  }

  getById(id:number):Observable<BalnearioResponse>{
    return this.http.get<BalnearioResponse>(`${this.apiUrl}/${id}`)
  }


  save(balneario:BalnearioRequest): Observable<BalnearioResponse>{
    return this.http.post<BalnearioResponse>(this.apiUrl,balneario);
  }

  uploadImage(id:number,archive:File):Observable<any>{
    const formData=new FormData();

    formData.append('archive', archive);
    
    return this.http.post<any>(`${this.apiUrl}/${id}/image`,formData)
  }

  
}
