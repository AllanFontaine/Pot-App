import { Component, OnInit } from '@angular/core';
import {PersonalGardenService} from '../../service/personal-garden.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {

  formGroup: FormGroup;
  listPlant:[];
  data:[]

  constructor(private garden: PersonalGardenService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.garden.get_plants().subscribe(
      res => {
        this.listPlant = res
      },
      err => console.log(err)
    )
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup(
      {
        numero_parcelle: new FormControl(null, [Validators.required]),
        taille_metre_carre: new FormControl(null, [Validators.required]),
        planteId: new FormControl(null, [Validators.required]),
        date_plantation: new FormControl("", [Validators.required])
      }
    )
  }

  addParcelUser(form: NgForm) {
    form.value['userId'] = parseInt(localStorage.getItem('user_id'));
    form.value['estUtilise'] = true;
    form.value["date_plantation"] = form.value["date_plantation"].toISOString();
    form.value["date_plantation"] = form.value["date_plantation"].split("T")[0];
    console.log(form.value);
    this.garden.add_parcel(form.value).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/dashboard'])
      },
      err => console.log(err)
    )
  }

}
