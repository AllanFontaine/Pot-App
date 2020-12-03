import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import * as AOS from 'aos';
import { LoginViewComponent } from "../login-view/login-view.component";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  public isCollapsed = true;
  submitted = false;

  constructor(private viewportScroller: ViewportScroller) {
  }

  ngOnInit(): void {
    AOS.init()
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
