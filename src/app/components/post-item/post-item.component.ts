import { Component, Input } from '@angular/core';

import { IPost } from '../../../common/types/hexad.d';
import { PostsService } from './../../services/posts.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post: IPost;

  isCommentsOpen = false;
  isLiked = false;

  constructor(
    private postsService: PostsService
  ) { }

  toggleComments() {
    this.isCommentsOpen = !this.isCommentsOpen;
  }

  updateLike(post: IPost) {
    this.postsService.updateLike(post, this.isLiked);
    this.isLiked = !this.isLiked;
  }

}
