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
export class NavbarHomeComponent{
  public isCollapsed = true;

  constructor(private viewportScroller: ViewportScroller) {
  }

  public onClick(elementId: string): void {
    /*console.log($(this));
    var target = document.getElementById(elementId);
    $("html, body").animate(
      {
        scrollTop: target.top - 70,
      },
      1000000,
      "easeInOutExpo"
    );
    $(".navbar-collapse").collapse("hide");*/
    document.getElementById(elementId).scrollIntoView({behavior: "smooth"})
  }

}
