import { Component } from '@angular/core';

import { PostsService } from './../../services/posts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  value: string;

  constructor(
    private postsService: PostsService,
  ) { }

  searchPosts() {
    this.postsService.filterPosts(this.value);
  }

  clearValue() {
    this.value = '';
    this.searchPosts();
  }
}
