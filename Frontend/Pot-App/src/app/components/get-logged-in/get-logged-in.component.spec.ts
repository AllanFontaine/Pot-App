import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLoggedInComponent } from './get-logged-in.component';

describe('GetLoggedInComponent', () => {
  let component: GetLoggedInComponent;
  let fixture: ComponentFixture<GetLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetLoggedInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
