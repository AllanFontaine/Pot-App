import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleParcelComponent } from './single-parcel.component';

describe('SingleParcelComponent', () => {
  let component: SingleParcelComponent;
  let fixture: ComponentFixture<SingleParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleParcelComponent ]
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
