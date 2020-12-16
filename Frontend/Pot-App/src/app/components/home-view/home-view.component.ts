import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import * as AOS from 'aos';
import { LoginViewComponent } from "../login-view/login-view.component";
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  public isCollapsed = true;
  submitted = false;

  constructor(private viewportScroller: ViewportScroller, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    AOS.init()
  }

  navi() {
    if (this.authService.LoggedIn()) {
      this.router.navigate(['/dashboard']).then(result => {
        if (result) {
          location.reload();
        }
      })
    } else {
      this.router.navigate(['/wiki']).then(result => {
        if (result) {
          location.reload();
        }
      })
    }
  }

}
