import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlantDetailComponent } from './single-plant-detail.component';

describe('SinglePlantDetailComponent', () => {
  let component: SinglePlantDetailComponent;
  let fixture: ComponentFixture<SinglePlantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlantDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
