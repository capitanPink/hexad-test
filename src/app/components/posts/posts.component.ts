import { Component, OnInit } from '@angular/core';

import { reverseArray } from './../../../common/utils/index';
import { PostsService } from './../../services/posts.service';
import { IPost } from './../../../common/types/hexad.d';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: IPost[];

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.posts = reverseArray(this.postsService.postsData);
    this.postsService.postsSubject.subscribe((posts: IPost[]) => this.posts = posts);
  }

}
