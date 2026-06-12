import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Job {
  by: string;
  id: number;
  time: number;
  title: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private jobsUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
  private itemUrl = 'https://hacker-news.firebaseio.com/v0/item';

  constructor(private http: HttpClient) {}

  getJobIds() {
    return this.http.get<number[]>(this.jobsUrl);
  }

  getJobDetails(id: number) {
    return this.http.get<Job>(`${this.itemUrl}/${id}.json`);
  }
}
