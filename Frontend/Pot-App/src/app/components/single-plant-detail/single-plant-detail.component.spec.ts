import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlantDetailComponent } from './single-plant-detail.component';
import { WikiService } from '../../service/wiki.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('SinglePlantDetailComponent', () => {
  let component: SinglePlantDetailComponent;
  let fixture: ComponentFixture<SinglePlantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePlantDetailComponent],
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
    fixture = TestBed.createComponent(SinglePlantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
