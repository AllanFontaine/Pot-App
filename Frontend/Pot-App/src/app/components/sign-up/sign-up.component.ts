import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  isLinear = true;
  firstFormGroup : FormGroup;
  secondFormGroup : FormGroup;
  helper = new JwtHelperService();
  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      surnameCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      mailCtrl: ['', [Validators.required, Validators.email]],
      userCtrl: ['', Validators.required],
      passCtrl: ['', Validators.required],
      confpassCtrl: ['', Validators.required]
    });
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
      }
    )
  }

  registerUser(form: NgForm) {
    const val = form.value;
    if(val.email && val.password && val.username) {
      this.authService.registerUser(form.value)
        .subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token', res.token.access)
            const decodedToken = this.helper.decodeToken(res.token.access);
            console.log(decodedToken);
            localStorage.setItem('user_id', decodedToken.user_id)
            localStorage.setItem('exp', decodedToken.exp)
            this.router.navigate(['/dashboard'])
            alert("Merci beaucoup pour votre inscription! Vous pouvez maintenant vous connecter et commencer votre chemin vers un potager optimiser et sain!")
          },
          err => {
            console.log(val)
            if (!!err.error.username) {
              alert(err.error.username)
            } else if (!!err.error.password) {
              alert(err.error.password)
            }
          },
        );
    } else{
      console.log("la valeur de val n'est pas conforme.");
      console.log(val);
    }
  }
  form1(){
    console.log(this.firstFormGroup.value);
  }

  form2(){
    console.log(this.secondFormGroup.value);
  }
}
