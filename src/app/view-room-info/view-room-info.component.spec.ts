import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomInfoComponent } from './view-room-info.component';

describe('ViewRoomInfoComponent', () => {
  let component: ViewRoomInfoComponent;
  let fixture: ComponentFixture<ViewRoomInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoomInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRoomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
