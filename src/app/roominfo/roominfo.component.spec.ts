import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoominfoComponent } from './roominfo.component';

describe('RoominfoComponent', () => {
  let component: RoominfoComponent;
  let fixture: ComponentFixture<RoominfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoominfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoominfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
