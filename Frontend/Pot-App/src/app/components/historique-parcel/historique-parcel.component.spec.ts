import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueParcelComponent } from './historique-parcel.component';

describe('HistoriqueParcelComponent', () => {
  let component: HistoriqueParcelComponent;
  let fixture: ComponentFixture<HistoriqueParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueParcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
