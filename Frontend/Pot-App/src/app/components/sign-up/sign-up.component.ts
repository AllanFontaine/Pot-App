import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators, NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerUserData = {email: '', username: '', first_name: '', last_name: '', password:''}

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.authService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err),
      );
  }
}
