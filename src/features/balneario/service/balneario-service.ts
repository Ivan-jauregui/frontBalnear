import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BalnearioResponse } from '../models/balnearioResponse';
import { BalnearioRequest } from '../models/balnearioRequest';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { BalnearioFilterDto } from '../models/balnearioFilterDto';
import { PageResponse } from '../../../shared/models/pageResponse';

@Injectable({
  providedIn: 'root',
})
export class BalnearioService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:8080/api/v1/balnearios";

  //Filtro
  nameFilter=signal<string>('');
  zoneFilter=signal<string>('');

  params= computed(()=>{

    let param=new HttpParams();
    
    if(this.nameFilter()){
      param = param.set('name',this.nameFilter())
    }
    if(this.zoneFilter()){
      param.set('zone',this.zoneFilter())
    }

    return param;
  })

  getAll(filter:BalnearioFilterDto,page:number=0,size:number=10): Observable<PageResponse<BalnearioResponse>> {
    let params=new HttpParams()
    .set('page',page.toString())
    .set('size',size.toString())

    Object.keys(filter).forEach(key=>{
      const value = filter[key as keyof BalnearioFilterDto];
      if(value !== null && value !== undefined && value !== ''){
        params=params.set(key,value.toString());
      }
    })

    return this.http.get<PageResponse<BalnearioResponse>>(this.apiUrl,{params}).pipe(
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
