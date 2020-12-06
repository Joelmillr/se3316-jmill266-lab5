import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoursesComponentComponent } from './search-courses-component.component';

describe('SearchCoursesComponentComponent', () => {
  let component: SearchCoursesComponentComponent;
  let fixture: ComponentFixture<SearchCoursesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCoursesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
