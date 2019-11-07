import { Component, Input } from '@angular/core';

import { IPost } from './../../../common/types/hexad.d';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() post: IPost;

  constructor() { }

}
