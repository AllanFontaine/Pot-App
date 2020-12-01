import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueParcelComponent } from './historique-parcel.component';
import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';

describe('HistoriqueParcelComponent', () => {
  let component: HistoriqueParcelComponent;
  let fixture: ComponentFixture<HistoriqueParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoriqueParcelComponent],
      imports: [RouterTestingModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
