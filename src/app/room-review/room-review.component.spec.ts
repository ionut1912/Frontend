import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReviewComponent } from './room-review.component';

describe('RoomReviewComponent', () => {
  let component: RoomReviewComponent;
  let fixture: ComponentFixture<RoomReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
