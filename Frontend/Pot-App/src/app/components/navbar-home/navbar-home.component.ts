import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  scrollToElement($element): void {
    console.log($element);
    document.getElementById($element).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
