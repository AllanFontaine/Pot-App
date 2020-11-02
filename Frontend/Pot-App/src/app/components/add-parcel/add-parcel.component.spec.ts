import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcelComponent } from './add-parcel.component';

describe('AddParcelComponent', () => {
  let component: AddParcelComponent;
  let fixture: ComponentFixture<AddParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParcelComponent ]
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
