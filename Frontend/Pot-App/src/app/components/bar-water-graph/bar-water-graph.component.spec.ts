import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarWaterGraphComponent } from './bar-water-graph.component';
import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('BarWaterGraphComponent', () => {
  let component: BarWaterGraphComponent;
  let fixture: ComponentFixture<BarWaterGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarWaterGraphComponent],
      imports: [RouterTestingModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler,
        DatePipe,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarWaterGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
