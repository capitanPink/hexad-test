import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { IPost, IComment } from './../../common/types/hexad.d';
import { reverseArray } from './../../common/utils/index';

const mockedPost = {
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
};

describe('PostsService', () => {
  let service: PostsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService],
    });
    service = TestBed.get(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addComment', () => {
    it('should invoke add comment method and add comment to array', () => {
      let currentPost: IPost;
      const comment: IComment = { userId: 'df1', message: 'test message' };
      spyOn(service, 'addComment').and.callFake((post: IPost, comment: IComment) => {
        currentPost = service.postsData.find((item: IPost) => item.id === post.id);
        currentPost.comments.unshift(comment);
      });
      expect(service.addComment).not.toHaveBeenCalled();
      service.addComment(mockedPost, comment);
      expect(currentPost.comments.length).toBe(4);
      expect(service.addComment).toHaveBeenCalledWith(mockedPost, comment);
    });
  });

  describe('filterPosts', () => {
    it('should filter posts with regexp and call postsSubjest.next method with new posts', () => {
      const query = 'query';
      spyOn(service.postsSubject, 'next').and.returnValue(undefined);
      spyOn(service, 'filterPosts').and.callFake((query: string) => {
        const posts = service.postsData.filter((post: IPost) => post.text.match(new RegExp(query, 'ig')));
        service.postsSubject.next(reverseArray(posts));
      });
      expect(service.postsSubject.next).not.toHaveBeenCalled();
      service.filterPosts(query);
      expect(service.postsSubject.next).toHaveBeenCalled();
      expect(service.filterPosts).toHaveBeenCalledWith(query);
    });
  });

  describe('updatePosts', () => {
    it('should update posts and call postsSubjest.next method with new posts', () => {
      const posts = service.postsData;
      expect(posts.length).toBe(2);
      spyOn(service.postsSubject, 'next').and.returnValue(undefined);
      spyOn(service, 'updatePosts').and.callFake((post: IPost) => {
        posts.push(post);
        service.postsSubject.next(posts);
      });
      expect(service.postsSubject.next).not.toHaveBeenCalled();
      service.updatePosts(mockedPost);
      expect(service.postsSubject.next).toHaveBeenCalled();
      expect(service.updatePosts).toHaveBeenCalledWith(mockedPost);
    });
  });

  describe('updateLike', () => {
    beforeEach(() => {
      const posts = service.postsData;
      spyOn(service.postsSubject, 'next').and.returnValue(undefined);
      spyOn(service, 'updateLike').and.callFake((data: IPost, isLiked: boolean) => {
        const foundPost = posts.find((post: IPost) => post.id === data.id);

        if (!isLiked) {
          foundPost.likes++;
        } else {
          foundPost.likes--;
        }
        service.postsSubject.next(reverseArray(posts));
      });
    });

    it('should increment like value and call postsSubjest.next method with new posts', () => {
      expect(service.postsSubject.next).not.toHaveBeenCalled();
      service.updateLike(mockedPost, true);
      expect(service.postsSubject.next).toHaveBeenCalled();
      expect(service.updateLike).toHaveBeenCalledWith(mockedPost, true);
    });

    it('should decrement like value and call postsSubjest.next method with new posts', () => {
      expect(service.postsSubject.next).not.toHaveBeenCalled();
      service.updateLike(mockedPost, false);
      expect(service.postsSubject.next).toHaveBeenCalled();
      expect(service.updateLike).toHaveBeenCalledWith(mockedPost, false);
    });
  });
});
