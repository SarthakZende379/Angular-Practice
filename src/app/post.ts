import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentUrl = 'https://jsonplaceholder.typicode.com/comments?postId=';

  getPost(): Observable<post[]> {
    return this.http.get<post[]>(this.postUrl);
  }

  getComment(id: number): Observable<comment[]> {
    return this.http.get<comment[]>(this.commentUrl + id);
  }
}