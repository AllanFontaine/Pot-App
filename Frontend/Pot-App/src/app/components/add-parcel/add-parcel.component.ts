import { Component, OnInit, Inject } from '@angular/core';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css'],
})
export class AddParcelComponent implements OnInit {

  chosenPlant = -1;
  numparcel = 0;
  formGroup: FormGroup;
  listPlant = [];
  listPlantName: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private garden: PersonalGardenService,
    private router: Router,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddParcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.garden.get_plants().subscribe(
      (res) => {
        this.listPlant = res;
        for (let i = 0; i < this.listPlant.length; i++) {
          this.listPlantName[i] = res[i].nom;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        }

      },
      (err) => console.log(err)
    );

    this.initForm();

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listPlantName.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  initForm() {
    this.formGroup = new FormGroup({
      taille_metre_carre: new FormControl(null, [Validators.required]),
      date_plantation: new FormControl('', [Validators.required]),
    });
  }

  placeParcel(num) {
    this.numparcel = num;
  }
  onSelectionChange(event) {
    for (let i = 0; i < this.listPlant.length; i++) {
      if (this.listPlant[i].nom === event.option.value) {
        this.chosenPlant = this.listPlant[i].id;
        break;
      }
    }

  }
  addParcelUser(form: NgForm) {
    form.value['planteId'] = this.chosenPlant;
    form.value['numero_parcelle'] = this.numparcel;
    form.value['userId'] = parseInt(localStorage.getItem('user_id'));
    form.value['estUtilise'] = true;
    form.value['date_plantation'].setDate(form.value['date_plantation'].getDate()  + 1 );
    form.value['date_plantation'] = form.value['date_plantation'].toISOString();
    form.value['date_plantation'] = form.value['date_plantation'].split('T')[0];
    this.garden.add_parcel(form.value).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close('SUCCESS');
      },
      (err) => {
        console.log(err)
        this.dialogRef.close('ERROR');
      });

  }

  cancelClose() {
    this.dialogRef.close('CANCEL');
  }
}
