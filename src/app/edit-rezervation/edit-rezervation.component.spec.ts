import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRezervationComponent } from './edit-rezervation.component';

describe('EditRezervationComponent', () => {
  let component: EditRezervationComponent;
  let fixture: ComponentFixture<EditRezervationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRezervationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRezervationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
