import { Component, OnInit } from '@angular/core';
import {PersonalGardenService} from "../../services/personal-garden.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {

  formGroup: FormGroup;
  listPlant:[];
  data:[]

  constructor(private garden: PersonalGardenService, private router: Router) { }

  ngOnInit(): void {
    this.garden.get_plants().subscribe(
      res => {
        this.listPlant = res
      },
      err => console.log(err)
    )
    this.initForm()
  }

  initForm(){
    this.formGroup = new FormGroup(
      {
        numero_parcelle: new FormControl(null, [Validators.required]),
        taille: new FormControl(null, [Validators.required]),
        plante: new FormControl(null, [Validators.required]),
      }
    )
  }

  addParcelUser(form: NgForm){
    form.value["user"]=parseInt(localStorage.getItem('user_id'));
    console.log(form.value);
    this.garden.add_parcel(form.value).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/garden'])
      },
      err => console.log(err)
    )
  }

}
