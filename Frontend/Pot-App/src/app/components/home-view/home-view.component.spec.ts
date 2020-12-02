import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewComponent } from './home-view.component';
import { AuthService } from '../../service/auth.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeViewComponent],
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        HttpClient,
        HttpHandler,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
