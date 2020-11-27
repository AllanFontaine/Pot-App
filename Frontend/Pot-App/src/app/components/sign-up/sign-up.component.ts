import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {AbstractControl, FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  isLinear = true;
  helper = new JwtHelperService();
  formGroup: FormGroup;

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private authService: AuthService, private router: Router, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          surnameCtrl: ['', Validators.required],
          nameCtrl: ['', Validators.required],
          adresse: '',
        }),
        this._formBuilder.group({
          mailCtrl:  ['', [Validators.required, Validators.email]],
          userCtrl: ['', Validators.required],
          passCtrl: ['', [Validators.required, Validators.minLength(8)]],
        })
      ])
    });
    console.log()
  }

  /*initForm() {
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
*/
  registerUser(form: NgForm) {
    let nomUser= this.formGroup.value['formArray'][1].userCtrl;
    let mail= this.formGroup.value['formArray'][1].mailCtrl;
    let pass = this.formGroup.value['formArray'][1].passCtrl;
    let prenom = this.formGroup.value['formArray'][0].surnameCtrl;
    let nom = this.formGroup.value['formArray'][0].nameCtrl;
    let addres = this.formGroup.value['formArray'][0].adresse;
    let prof = {
      "user": 0,
      "nombre_parcelle": 0,
      "localisation": addres ? addres : '' 
    }
    let user={
      "username": nomUser,
      "email": mail,
      "password": pass,
      "first_name": prenom,
      "last_name": nom
    }
    console.log(user);
    this.authService.registerUser(user)
    .subscribe(
      res => {
        console.log(prof);
        prof.user= res.id;
        console.log(prof);
        localStorage.setItem('token', res.token.access)
        const decodedToken = this.helper.decodeToken(res.token.access);
        console.log(decodedToken);
        localStorage.setItem('user_id', decodedToken.user_id)
        localStorage.setItem('exp', decodedToken.exp)
        this.authService.postProfil(prof).subscribe(res => {
          this.router.navigate(['/dashboard'])
          alert("Merci beaucoup pour votre inscription! Vous pouvez maintenant vous connecter et commencer votre chemin vers un potager optimisé et sain!")
        },
        err => console.log(err)
        );
      },
      err => {
        console.log(user)
        if (!!err.error.username) {
          alert(err.error.username)
        } else if (!!err.error.password) {
          alert(err.error.password)
        }
      },
    );

    //  if(val.email && val.password && val.username) {
       
    //  } else{
    //    console.log("la valeur de val n'est pas conforme.");
    //    console.log(val);
    //  }
  }
}
