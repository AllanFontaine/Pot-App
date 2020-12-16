import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../service/auth.service'

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLayoutComponent],
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
