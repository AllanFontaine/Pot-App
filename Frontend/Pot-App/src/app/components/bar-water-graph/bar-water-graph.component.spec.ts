import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarWaterGraphComponent } from './bar-water-graph.component';

describe('BarWaterGraphComponent', () => {
  let component: BarWaterGraphComponent;
  let fixture: ComponentFixture<BarWaterGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarWaterGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarWaterGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
