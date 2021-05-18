import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllReservationsComponent } from './view-all-reservations.component';

describe('ViewAllReservationsComponent', () => {
  let component: ViewAllReservationsComponent;
  let fixture: ComponentFixture<ViewAllReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
