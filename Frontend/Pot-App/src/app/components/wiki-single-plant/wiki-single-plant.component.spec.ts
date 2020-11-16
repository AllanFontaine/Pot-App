import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiSinglePlantComponent } from './wiki-single-plant.component';

describe('WikiSinglePlantComponent', () => {
  let component: WikiSinglePlantComponent;
  let fixture: ComponentFixture<WikiSinglePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiSinglePlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiSinglePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
