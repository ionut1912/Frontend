import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsticsComponent } from './staticstics.component';

describe('StaticsticsComponent', () => {
  let component: StaticsticsComponent;
  let fixture: ComponentFixture<StaticsticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticsticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
