import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginViewComponent } from '../login-view/login-view.component'


@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {
  public isCollapsed = true;

  constructor(private viewportScroller: ViewportScroller, private formBuilder: FormBuilder, public dialog: MatDialog) {
  }


  show(): void {
    const dialogRef = this.dialog.open(LoginViewComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  registerForm: FormGroup;
  submitted = false;

  ngOnInit() {
  }
  // convenience getter for easy access to form fields


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
    document.getElementById(elementId).scrollIntoView({ behavior: "smooth" })
  }

}
