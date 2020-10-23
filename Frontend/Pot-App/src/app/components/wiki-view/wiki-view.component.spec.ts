import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiViewComponent } from './wiki-view.component';

describe('WikiViewComponent', () => {
  let component: WikiViewComponent;
  let fixture: ComponentFixture<WikiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
