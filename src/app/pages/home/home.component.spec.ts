import { AddCommentComponent } from './../../components/add-comment/add-comment.component';
import { CommentsComponent } from './../../components/comments/comments.component';
import { AvatarComponent } from './../../components/avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PostItemComponent } from './../../components/post-item/post-item.component';
import { NewPostComponent } from './../../components/new-post/new-post.component';
import { SearchComponent } from './../../components/search/search.component';
import { WrapperComponent } from './../../components/wrapper/wrapper.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PostsComponent } from 'src/app/components/posts/posts.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        FormsModule,
      ],
      declarations: [
        HomeComponent,
        PostsComponent,
        WrapperComponent,
        SearchComponent,
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
