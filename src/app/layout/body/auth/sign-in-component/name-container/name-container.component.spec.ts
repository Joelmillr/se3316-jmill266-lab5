import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameContainerComponent } from './name-container.component';

describe('NameContainerComponent', () => {
  let component: NameContainerComponent;
  let fixture: ComponentFixture<NameContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
