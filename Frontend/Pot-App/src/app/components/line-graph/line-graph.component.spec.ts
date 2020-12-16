import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphComponent } from './line-graph.component';

import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('LineGraphComponent', () => {
  let component: LineGraphComponent;
  let fixture: ComponentFixture<LineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineGraphComponent],
      imports: [RouterTestingModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler,
        DatePipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
