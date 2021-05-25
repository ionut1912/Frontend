import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoomImagesComponent } from './view-room-images.component';

describe('ViewRoomImagesComponent', () => {
  let component: ViewRoomImagesComponent;
  let fixture: ComponentFixture<ViewRoomImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoomImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRoomImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
