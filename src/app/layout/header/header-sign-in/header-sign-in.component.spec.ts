import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSignInComponent } from './header-sign-in.component';

describe('HeaderSignInComponent', () => {
  let component: HeaderSignInComponent;
  let fixture: ComponentFixture<HeaderSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
