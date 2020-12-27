import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSchedulesComponent } from './public-schedules.component';

describe('PublicSchedulesComponent', () => {
  let component: PublicSchedulesComponent;
  let fixture: ComponentFixture<PublicSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
