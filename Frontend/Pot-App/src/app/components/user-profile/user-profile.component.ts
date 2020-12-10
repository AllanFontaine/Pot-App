import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form : FormGroup;
  my_user;
  my_profile;
  modifyTrue = true;
  isLoading = true;

  constructor(private userService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.userService.get_User().subscribe(
      res => {
        this.my_user = res
        this.userService.get_Profile().subscribe(
          res => {
            this.my_profile = res[0]
            this.isLoading = false;
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  initForm(){
    this.form = new FormGroup({
      email : new FormControl('',[Validators.email]),
      last_name : new FormControl(''),
      first_name : new FormControl(''),
      username : new FormControl(''),
    });
  }
  getNombreParcelle() {
    return this.my_profile.nombre_parcelle ? this.my_profile.nombre_parcelle : 'Zéro parcelle encodée';
  }

  modifyProfile() {
    this.modifyTrue = false;
  }

  onSubmit(form: NgForm) {
    form.value.username === "" ?  form.value.username=this.my_user.username : "";
    form.value.email === "" ?  form.value.email=this.my_user.email : "";
    form.value.first_name === "" ?  form.value.first_name=this.my_user.first_name : "";
    form.value.last_name === "" ?  form.value.last_name=this.my_user.last_name : "";
    console.log(form.value);
    this.userService.modify_User(localStorage.getItem("token"),form.value).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => console.log(err)
    );
    this.modifyTrue = true;
  }
}

