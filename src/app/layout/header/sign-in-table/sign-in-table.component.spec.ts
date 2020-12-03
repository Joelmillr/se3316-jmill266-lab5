import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInTableComponent } from './sign-in-table.component';

describe('SignInTableComponent', () => {
  let component: SignInTableComponent;
  let fixture: ComponentFixture<SignInTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
