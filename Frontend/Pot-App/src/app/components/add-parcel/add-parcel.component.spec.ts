import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcelComponent } from './add-parcel.component';
import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { DatePipe } from '@angular/common';

describe('AddParcelComponent', () => {
  let component: AddParcelComponent;
  let fixture: ComponentFixture<AddParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddParcelComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler,
        DatePipe,
        MatDialogRef
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
