import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      }
    )
  }

  registerUser(form: NgForm) {
    this.authService.registerUserSession(form.value)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this.router.navigate(['/garden'])
        },
        err => {
          console.log(err)
          if (!!err.error.username){
            alert(err.error.username)
          } else if (!!err.error.password){
            alert(err.error.password)
          }
        },
      );
  }
}
