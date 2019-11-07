import { idGenerator } from 'src/common/utils';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './../avatar/avatar.component';
import { PostItemComponent } from './../post-item/post-item.component';
import { NewPostComponent } from './new-post.component';
import { PostsService } from './../../services/posts.service';
import { AddCommentComponent } from './../add-comment/add-comment.component';
import { CommentsComponent } from './../comments/comments.component';

describe('NewPostComponent', () => {
  let service: PostsService;
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        NewPostComponent,
        PostItemComponent,
        AvatarComponent,
        CommentsComponent,
        AddCommentComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(PostsService);
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createPost', () => {
    it('should create new post and call updatePosts method of postsSerice', () => {
      const authorData = {
        id: 1,
        firstName: 'John',
        lastName: 'Due',
        username: '@Jdue99',
      };

      spyOn(service, 'authorData').and.returnValue(authorData);
      const author = service.authorData;
      expect(author).toEqual(authorData);
      expect(component.text).toBe(undefined);

      const post = {
        id: idGenerator(),
        text: component.text,
        timeToRead: '10 min',
        likes: 0,
        author,
        comments: []
      };
      const mockFn = () => {
        service.updatePosts(post);
        component.text = '';
      };
      spyOn(service, 'updatePosts').and.returnValue(undefined);
      expect(service.updatePosts).not.toHaveBeenCalled();
      spyOn(component, 'createPost').and.callFake(mockFn);
      component.createPost();
      expect(service.updatePosts).toHaveBeenCalledWith(post);
      expect(component.text).toBe('');
    });
  });
});
