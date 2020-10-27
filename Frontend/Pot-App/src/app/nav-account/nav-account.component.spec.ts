import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccountComponent } from './nav-account.component';

describe('NavAccountComponent', () => {
  let component: NavAccountComponent;
  let fixture: ComponentFixture<NavAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
