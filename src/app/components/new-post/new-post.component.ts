import { Component } from '@angular/core';

import { PostsService } from './../../services/posts.service';
import { idGenerator } from 'src/common/utils';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  text: string;

  constructor(
    private postsService: PostsService,
  ) { }

  createPost() {
    const author = this.postsService.authorData;
    const post = {
      id: idGenerator(),
      text: this.text,
      timeToRead: '10 min',
      likes: 0,
      author,
      comments: []
    };
    this.postsService.updatePosts(post);
    this.text = '';
  }
}
