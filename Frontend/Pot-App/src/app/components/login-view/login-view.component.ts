import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  helper = new JwtHelperService();
  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
  }

  LoginProcess(form: NgForm) {
      this.authService.login(form.value).subscribe(
        (result) => {
          localStorage.setItem('token', result.access)
          const decodedToken = this.helper.decodeToken(result.access);
          console.log(decodedToken);
          localStorage.setItem('user_id', decodedToken.user_id)
          this.router.navigate(['/dashboard'])
        },
        (error) => {
          console.log('WARNING: ' + error);
        }
      )
  }

}
