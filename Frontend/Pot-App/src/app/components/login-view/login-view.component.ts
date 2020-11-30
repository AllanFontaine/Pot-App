import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  helper = new JwtHelperService();
  formGroup: FormGroup;

  matcher = new MyErrorStateMatcher();

  incorectData: boolean = false;
  missingData: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    console.log(this.formGroup)
  }


  cancelClose() {
    this.dialogRef.close('CANCEL');
  }

  LoginProcess(form: NgForm) {
    this.missingData = false
    this.incorectData = false
    console.log(form.value)
    this.authService.login(form.value).subscribe(
      (result) => {
        localStorage.setItem('token', result.access)
        const decodedToken = this.helper.decodeToken(result.access);
        console.log(decodedToken);
        localStorage.setItem('user_id', decodedToken.user_id)
        localStorage.setItem('exp', decodedToken.exp)
        this.dialogRef.close('SUCCESS');
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        console.log(error.status)
        error.status === 400 ? this.missingData = true : ""
        error.status === 401 ? this.incorectData = true : ""

      }
    )
  }

}
