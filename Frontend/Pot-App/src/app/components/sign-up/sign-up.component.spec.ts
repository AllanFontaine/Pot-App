import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../../service/auth.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler,
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
