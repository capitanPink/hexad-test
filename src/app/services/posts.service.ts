import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IPost, IAuthor, IComment } from './../../common/types/hexad.d';
import { reverseArray } from './../../common/utils/index';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private author: IAuthor = {
    id: 1,
    firstName: 'John',
    lastName: 'Due',
    username: '@Jdue99',
  };

  private posts: IPost[] = [
    {
      id: 'vaaasd',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      likes: 13,
      timeToRead: '10 min',
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'Due',
        username: '@Jdue99',
      },
      comments: [
        {
          userId: 'f14313',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          userId: '132d23',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          userId: 'fe1331',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ],
    },
    {
      id: 'adsfvaas',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      likes: 15,
      timeToRead: '10 min',
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'Due',
        username: '@Jdue99',
      },
      comments: [
        {
          userId: 'fvadsf1',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          userId: '123fdas',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
          userId: '123fdas',
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ],
    },
  ];

  postsSubject = new Subject();

  constructor() { }

  get postsData() {
    return this.posts;
  }

  get authorData() {
    return this.author;
  }

  addComment(post: IPost, comment: IComment) {
    const currentPost = this.postsData.find((item: IPost) => item.id === post.id);
    currentPost.comments.unshift(comment);
  }

  filterPosts(str: string) {
    const posts = this.postsData.filter((post: IPost) => post.text.match(new RegExp(str, 'ig')));
    this.postsSubject.next(reverseArray(posts));
  }

  updatePosts(post: IPost) {
    const posts = this.postsData;
    posts.push(post);
    this.postsSubject.next(reverseArray(posts));
  }

  updateLike(data: IPost, isLiked: boolean) {
    const posts = this.postsData;
    const post = posts.find((post: IPost) => post.id === data.id);

    if (!isLiked) {
      post.likes++;
    } else {
      post.likes--;
    }
    this.postsSubject.next(reverseArray(posts));
  }
}
