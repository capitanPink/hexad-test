import { PostsService } from './../../services/posts.service';
import { FormsModule } from '@angular/forms';

import { AddCommentComponent } from './../add-comment/add-comment.component';
import { AvatarComponent } from './../avatar/avatar.component';
import { CommentsComponent } from './../comments/comments.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostItemComponent } from './post-item.component';

describe('PostItemComponent', () => {
  let service: PostsService;
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        PostItemComponent,
        CommentsComponent,
        AvatarComponent,
        AddCommentComponent,
      ],
      providers: [
        PostsService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(PostsService);
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    component.post = {
      likes: 0,
      author: {},
      comments: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleComments', () => {
    it('should toggle comments section', () => {
      const mockFn = () => {
        component.isCommentsOpen = !component.isCommentsOpen;
      };
      expect(component.isCommentsOpen).toBeFalsy();
      spyOn(component, 'toggleComments').and.callFake(mockFn);
      expect(component.toggleComments).not.toHaveBeenCalled();
      component.toggleComments();
      expect(component.isCommentsOpen).toBeTruthy();
      expect(component.toggleComments).toHaveBeenCalled();
    });
  });

  describe('updateLike', () => {
    it('should invoke updateLike method and change likes quantity', () => {
      const mockFn = () => {
        service.updateLike(component.post, component.isLiked);
        component.isLiked = !component.isLiked;
      };
      expect(component.isLiked).toBeFalsy();
      spyOn(service, 'updateLike').and.returnValue(undefined);
      expect(service.updateLike).not.toHaveBeenCalled();

      spyOn(component, 'updateLike').and.callFake(mockFn);
      component.updateLike(component.post);
      expect(component.isLiked).toBeTruthy();
      expect(service.updateLike).toHaveBeenCalled();
    });
  });
});
