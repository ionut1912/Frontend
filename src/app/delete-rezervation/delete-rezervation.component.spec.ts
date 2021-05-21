import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRezervationComponent } from './delete-rezervation.component';

describe('DeleteRezervationComponent', () => {
  let component: DeleteRezervationComponent;
  let fixture: ComponentFixture<DeleteRezervationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRezervationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRezervationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
