import { Component, OnInit, Inject } from '@angular/core';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css'],
})
export class AddParcelComponent implements OnInit {
  numparcel = 0;
  formGroup: FormGroup;
  listPlant: [];

  constructor(
    private garden: PersonalGardenService,
    private router: Router,
    public dialogRef: MatDialogRef<AddParcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.garden.get_plants().subscribe(
      (res) => {
        this.listPlant = res;
      },
      (err) => console.log(err)
    );
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      taille_metre_carre: new FormControl(null, [Validators.required]),
      planteId: new FormControl(null, [Validators.required]),
      date_plantation: new FormControl('', [Validators.required]),
    });
  }

  placeParcel(num) {
    this.numparcel = num;
    console.log(this.numparcel);
  }
  addParcelUser(form: NgForm) {
    console.log(this.numparcel);
    form.value['numero_parcelle'] = this.numparcel;
    form.value['userId'] = parseInt(localStorage.getItem('user_id'));
    form.value['estUtilise'] = true;
    form.value['date_plantation'] = form.value['date_plantation'].toISOString();
    console.log(form.value['date_plantation']);
    form.value['date_plantation'] = form.value['date_plantation'].split('T')[0];
    console.log(form.value);
    this.garden.add_parcel(form.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
    this.dialogRef.close('SUCCESS');
  }
  cancelClose() {
    this.dialogRef.close('CANCEL');
  }
}
