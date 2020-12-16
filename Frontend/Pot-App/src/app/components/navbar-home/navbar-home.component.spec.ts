import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHomeComponent } from './navbar-home.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
describe('NavbarHomeComponent', () => {
  let component: NavbarHomeComponent;
  let fixture: ComponentFixture<NavbarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarHomeComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
