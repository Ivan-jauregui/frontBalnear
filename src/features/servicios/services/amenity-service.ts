import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Amenity } from '../models/amenity' 
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmenityService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/v1/servicios";
 
  getAll():Observable<Amenity[]>{
    return this.http.get<Amenity[]>(this.apiUrl).pipe(
          catchError(error => {
            console.error('Error en el flujo de datos de proyectos:', error);
            return throwError(() => new Error('No se pudieron recuperar los proyectos. Reintente más tarde.'));
          })
        );
  }
}
