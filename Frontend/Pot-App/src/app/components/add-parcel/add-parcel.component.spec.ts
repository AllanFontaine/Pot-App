import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddParcelComponent } from './add-parcel.component';
import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('AddParcelComponent', () => {
  let component: AddParcelComponent;
  let fixture: ComponentFixture<AddParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddParcelComponent],
      imports: [RouterTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatSelectModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler,
        DatePipe,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
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
