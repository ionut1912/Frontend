import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEmailComponent } from './code-email.component';

describe('CodeEmailComponent', () => {
  let component: CodeEmailComponent;
  let fixture: ComponentFixture<CodeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
