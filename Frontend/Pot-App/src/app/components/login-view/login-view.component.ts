import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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

  formGroup: FormGroup;
  password; username;
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
        username: new FormControl(''),
        password: new FormControl(''),
      }
    )
  }


  cancelClose() {
    this.dialogRef.close('CANCEL');
  }

  getErrorMessage() {
    console.log(this.formGroup.value)
    console.log(this.formGroup.value)
    
  }

  LoginProcess(form: NgForm) {
    console.log(this.formGroup.get('password').value)
    this.missingData = false
    this.incorectData = false
    this.authService.login(form.value).subscribe(
      (result) => {
        localStorage.setItem('token', result.access)
        this.dialogRef.close('SUCCESS');
        this.router.navigate(['/dashboard']).then(result => {
          if (result) {
            location.reload();
          }
        });
      },
      (error) => {
        console.log(error.status)
        error.status === 400 ? this.missingData = true : ""
        error.status === 401 ? this.incorectData = true : ""

      }
    )
  }

}
