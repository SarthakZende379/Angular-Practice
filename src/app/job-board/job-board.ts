import { Component, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { JobService, Job } from '../job-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-job-board',
  imports: [],
  templateUrl: './job-board.html',
  styleUrl: './job-board.css',
})
export class JobBoard implements OnInit {
  private jobService = inject(JobService);

  jobs = signal<Job[]>([]);
  loading = signal(true);
  error = signal('');

  private allIds: number[] = [];
  private page = 0;
  readonly PAGE_SIZE = 6;

  ngOnInit() {
    this.jobService.getJobIds().subscribe({
      next: (ids) => {
        this.allIds = ids;
        this.fetchPage();
      },
      error: () => {
        this.error.set('Failed to load jobs');
        this.loading.set(false);
      }
    });
  }

  fetchPage() {
    const start = this.page * this.PAGE_SIZE;
    const ids = this.allIds.slice(start, start + this.PAGE_SIZE);

    forkJoin(ids.map(id => this.jobService.getJobDetails(id))).subscribe({
      next: (newJobs) => {
        this.jobs.set([...this.jobs(), ...newJobs]);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load job details');
        this.loading.set(false);
      }
    });
  }

  loadMore() {
    this.page++;
    this.fetchPage();
  }

  hasMore() {
    return (this.page + 1) * this.PAGE_SIZE < this.allIds.length;
  }

  formatDate(time: number): string {
    return new Date(time * 1000).toLocaleString();
  }
}
