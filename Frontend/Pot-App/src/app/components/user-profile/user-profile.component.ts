import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  my_user = {};
  my_profile = {};
  modifyTrue = true;

  constructor(private userService: AuthService) { }

  ngOnInit() {
    this.userService.get_User(localStorage.getItem('user_id')).subscribe(
      res => {
        this.my_user = res
        console.log(this.my_user);
      },
      err => console.log(err)
    )
    this.userService.get_Profile(localStorage.getItem('user_id')).subscribe(
      res => {
        this.my_profile = res
        console.log(this.my_profile);
      },
      err => console.log(err)
    )
  }
  getNombreParcelle(){
    return this.my_profile[0].nombre_parcelle ? this.my_profile[0].nombre_parcelle : 'Zéro parcelle encodée';
  }

  modifyProfile(){
    this.modifyTrue = false;
    console.log(this.modifyTrue);
  }

  onSubmit(form: NgForm){
    this.modifyTrue = true;
    this.ngOnInit();
  }
  }

