import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViewComponent } from './login-view.component';

import { FormBuilder, FormsModule } from '@angular/forms'
import { AuthService } from '../../service/auth.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginViewComponent],
      imports: [RouterTestingModule, MatDialogModule, FormsModule],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },

        FormBuilder,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
