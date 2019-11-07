import { reverseArray } from './../../../common/utils/index';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsService } from './../../services/posts.service';
import { AddCommentComponent } from './../add-comment/add-comment.component';
import { AvatarComponent } from './../avatar/avatar.component';
import { CommentsComponent } from './../comments/comments.component';
import { PostItemComponent } from './../post-item/post-item.component';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let service: PostsService;
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        PostsComponent,
        PostItemComponent,
        CommentsComponent,
        AvatarComponent,
        AddCommentComponent,
      ],
      providers: [PostsService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(PostsService);
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should equate posts to posts object, should subscribe to the observable', () => {
      fixture.whenStable().then(() => {
        expect(component.posts).toEqual(reverseArray(service.postsData));
        service.postsSubject.subscribe((posts) => expect(posts).toBe(undefined));
      });
    });
  });
});
