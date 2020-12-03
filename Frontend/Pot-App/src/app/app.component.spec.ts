import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { PersonalGardenService } from './service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler,
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
