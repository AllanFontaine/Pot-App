import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoGardenComponent } from './perso-garden.component';

describe('PersoGardenComponent', () => {
  let component: PersoGardenComponent;
  let fixture: ComponentFixture<PersoGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoGardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
