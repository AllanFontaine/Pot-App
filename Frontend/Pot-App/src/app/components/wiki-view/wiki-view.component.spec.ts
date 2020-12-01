import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiViewComponent } from './wiki-view.component';
import { WikiService } from '../../service/wiki.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('WikiViewComponent', () => {
  let component: WikiViewComponent;
  let fixture: ComponentFixture<WikiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiViewComponent],
      imports: [RouterTestingModule],
      providers: [
        WikiService,
        HttpClient,
        HttpHandler,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
