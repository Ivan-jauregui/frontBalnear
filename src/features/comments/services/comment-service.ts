import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentRequest } from '../models/comment-request';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
     private apiUrl = "http://localhost:8080/api/v1/comments";
  
    save(req: CommentRequest): Observable<CommentRequest> {
      return this.http.post<CommentRequest>(this.apiUrl,req);
    }
}
