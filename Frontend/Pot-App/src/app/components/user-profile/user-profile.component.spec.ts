import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { AuthService } from '../../service/auth.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
