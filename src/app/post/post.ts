import { Component, inject, OnInit, signal } from '@angular/core';
import { post, comment, PostService } from '../post';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post implements OnInit {
  private postService = inject(PostService);
  posts = signal<post[]>([]);
  comments = signal<comment[]>([]);
  activePostId = signal<number | null>(null);

  ngOnInit() {
    this.postService.getPost().subscribe((data) => {
      this.posts.set(data);
    });
  }

  showComment(id: number) {
    if (this.activePostId() === id) {
      this.activePostId.set(null);
      return;
    }
    this.postService.getComment(id).subscribe((data) => {
      this.comments.set(data);
      this.activePostId.set(id);
    });
  }
}