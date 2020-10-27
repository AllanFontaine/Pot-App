import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
  }

  LoginProcess(form: NgForm){
      this.authService.login(form.value).subscribe(
        (result) => {
          localStorage.setItem('token', result.access)
          console.log(form.value);
          this.router.navigate(['/garden'])
        },
        (error) => {
          console.log("WARNING: " + error);
        }
      )
  }

}
