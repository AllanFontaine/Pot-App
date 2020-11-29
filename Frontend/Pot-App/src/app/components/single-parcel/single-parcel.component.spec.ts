import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleParcelComponent } from './single-parcel.component';
import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
describe('SingleParcelComponent', () => {
  let component: SingleParcelComponent;
  let fixture: ComponentFixture<SingleParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleParcelComponent],
      imports: [RouterTestingModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
