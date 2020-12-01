import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLoggedInComponent } from './get-logged-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('GetLoggedInComponent', () => {
  let component: GetLoggedInComponent;
  let fixture: ComponentFixture<GetLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetLoggedInComponent],
      imports: [RouterTestingModule, MatDialogModule],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
