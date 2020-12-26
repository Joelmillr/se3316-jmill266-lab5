import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoursesResultsComponent } from './search-courses-results.component';

describe('SearchCoursesResultsComponent', () => {
  let component: SearchCoursesResultsComponent;
  let fixture: ComponentFixture<SearchCoursesResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCoursesResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
