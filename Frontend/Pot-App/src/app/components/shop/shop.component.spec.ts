import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';

import { PersonalGardenService } from '../../service/personal-garden.service'
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog'

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        PersonalGardenService,
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
