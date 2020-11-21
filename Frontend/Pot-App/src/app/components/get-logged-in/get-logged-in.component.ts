import { Component, OnInit } from '@angular/core';
import { LoginViewComponent } from '../login-view/login-view.component'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-get-logged-in',
  templateUrl: './get-logged-in.component.html',
  styleUrls: ['./get-logged-in.component.css']
})
export class GetLoggedInComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogForm(): void {
    let dialogRef = this.dialog.open(LoginViewComponent, {
      width: '450px',
    });
  }
}
