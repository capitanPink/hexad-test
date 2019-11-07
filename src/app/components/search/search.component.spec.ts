import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsService } from './../../services/posts.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let service: PostsService;
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        FormsModule,
      ],
      declarations: [SearchComponent],
      providers: [PostsService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(PostsService);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchPosts', () => {
    it('should call filterPosts method of postsService', () => {
      const str = 'query';
      spyOn(service, 'filterPosts').and.returnValue(undefined);
      spyOn(component, 'searchPosts').and.callFake(() => {
        service.filterPosts(str);
      });
      expect(service.filterPosts).not.toHaveBeenCalled();
      component.searchPosts();
      expect(service.filterPosts).toHaveBeenCalledWith(str);
    });
  });

  describe('clearValue', () => {
    it('should clear serach value, and call method serachPosts', () => {
      expect(component.value).toBe(undefined);
      spyOn(component, 'clearValue').and.callFake(() => {
        component.value = '';
        component.searchPosts();
      });
      spyOn(component, 'searchPosts').and.returnValue(undefined);
      expect(component.searchPosts).not.toHaveBeenCalled();
      component.clearValue();
      expect(component.searchPosts).toHaveBeenCalled();
      expect(component.value).toBe('');
    });
  });
});
