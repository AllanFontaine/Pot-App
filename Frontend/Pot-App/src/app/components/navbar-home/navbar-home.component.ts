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

  constructor(public viewportScroller: ViewportScroller, public formBuilder: FormBuilder, public dialog: MatDialog, public authService: AuthService) {
  }


  show(): void {
    const dialogRef = this.dialog.open(LoginViewComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  submitted = false;

  ngOnInit() {
  }


  public scrolling(elementId: string): void {
    document.getElementById(elementId).scrollIntoView({ behavior: "smooth" })
  }

}
