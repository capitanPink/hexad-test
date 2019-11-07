import { Component, Input } from '@angular/core';

import { IPost } from './../../../common/types/hexad.d';
import { PostsService } from './../../services/posts.service';
import { idGenerator } from '../../../common/utils';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  @Input() post: IPost;

  message: string;

  constructor(
    private postsSerice: PostsService,
  ) { }

  addNewComment() {
    const comment = {
      userId: idGenerator(),
      message: this.message
    };
    this.postsSerice.addComment(this.post, comment);
    this.message = '';
  }
}
