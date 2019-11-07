import { idGenerator } from 'src/common/utils';
import { PostsService } from './../../services/posts.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';

describe('AddCommentComponent', () => {
  let service: PostsService;
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddCommentComponent],
      providers: [PostsService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(PostsService);
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addNewComment', () => {
    it('should call postsService addComment method and make message variable empty', () => {
      const comment = {
        userId: idGenerator(),
        message: component.message
      };
      const mockFn = () => {
        service.addComment(component.post, comment);
        component.message = '';
      };
      expect(component.message).toBe(undefined);
      spyOn(service, 'addComment').and.returnValue(undefined);
      expect(service.addComment).not.toHaveBeenCalled();
      spyOn(component, 'addNewComment').and.callFake(mockFn);
      component.addNewComment();
      expect(component.message).toBe('');
      expect(service.addComment).toHaveBeenCalledWith(component.post, comment);
    });
  });
});
