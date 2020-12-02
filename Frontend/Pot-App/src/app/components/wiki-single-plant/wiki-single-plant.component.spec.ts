import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiSinglePlantComponent } from './wiki-single-plant.component';
import { WikiService } from '../../service/wiki.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
describe('WikiSinglePlantComponent', () => {
  let component: WikiSinglePlantComponent;
  let fixture: ComponentFixture<WikiSinglePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiSinglePlantComponent],
      imports: [RouterTestingModule],
      providers: [
        WikiService,
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiSinglePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
