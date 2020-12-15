import { Component, OnInit, Inject } from '@angular/core';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css'],
})
export class AddParcelComponent implements OnInit {

  chosenPlant = -1;
  plantConseil: string;
  numparcel = 0;
  last_plant_nom; request_conseil; composant_consomme; horl;
  date_plantation;
  diasbled_tooltip: boolean = true;
  formGroup: FormGroup;
  listPlant = [];
  listPlantConseil = [];
  listPlantName: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private garden: PersonalGardenService,
    private router: Router,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddParcelComponent>,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.dateAdapter.setLocale('fr'); }

  ngOnInit(): void {
    //this.date_plantation = new Date();
    console.log(!this.listPlantConseil)
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
    });
  }

  placeParcel(num) {
    this.numparcel = num;
  }

  onSelectionChange(event) {
    for (let i = 0; i < this.listPlant.length; i++) {
      if (this.listPlant[i].nom === event.option.value || this.listPlant[i].nom === document.getElementById("conseilInput")) {
        this.chosenPlant = this.listPlant[i].id;
        break;
      }
    }
  }

  changement_input(event) {
    let a = this.listPlant.find(element => element.nom === event)
    this.chosenPlant = a.id
  }

  addParcelUser(form: NgForm) {
    form.value['planteId'] = this.chosenPlant;
    form.value['date_plantation'] = this.chosenPlant;
    form.value['numero_parcelle'] = this.numparcel;
    form.value['estUtilise'] = true;
    this.date_plantation.setDate(this.date_plantation.getDate() + 1)
    form.value['date_plantation'] = this.date_plantation.toISOString().split('T')[0];
    this.garden.add_parcel(form.value).subscribe(
      (res) => {
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

  changement_input_date(event) {
    if (event instanceof Date) {
      this.diasbled_tooltip = false
      this.date_plantation = event.toISOString().split("T")[0]
      var a, comp, last_plant;
      var month = this.date_plantation.split("-")[1]
      var day = parseInt(this.date_plantation.split("-")[2]) + 1
      this.garden.get_last_parcel(this.data.num, event.toISOString().split('T')[0]).subscribe(
        result => {
          console.log(result)
          this.request_conseil = '';
          this.last_plant_nom = '';
          if (!!result[0]) {
            last_plant = result["0"].planteId;
            if (last_plant.azote_sol < 180 && last_plant.potassium_sol < 180 && last_plant.phosphore_sol < 180) {
              this.horl = "h"
              this.last_plant_nom = last_plant.nom
              a = last_plant.azote_sol > last_plant.potassium_sol ? "po " + last_plant.potassium_sol : "a " + last_plant.azote_sol;
              comp = a > last_plant.phosphore_sol ? "ph " + last_plant.phosphore_sol : a;
              this.request_conseil = this.horl + "T" + comp.split(" ")[0] + "T" + comp.split(" ")[1]
              this.composant_consomme = this.get_composant(this.request_conseil.split("T")[1])
            } else {
              this.horl = "l"
              this.last_plant_nom = last_plant.nom
              a = last_plant.azote_sol < last_plant.potassium_sol ? "po " + last_plant.potassium_sol : "a " + last_plant.azote_sol;
              comp = a < last_plant.phosphore_sol ? "ph " + last_plant.phosphore_sol : a;
              this.request_conseil = this.horl + "T" + comp.split(" ")[0] + "T" + comp.split(" ")[1]
              this.composant_consomme = this.get_composant(this.request_conseil.split("T")[1])
            }
          }
          console.log(this.request_conseil)
          this.garden.get_plants_conseil(month, day, this.request_conseil).subscribe(
            res => {
              console.log(res)
              if (res.length === 0) {
                this.request_conseil = '';
                this.garden.get_plants_conseil(month, day, this.request_conseil).subscribe(
                  result3 => {
                    console.log('am in')
                    console.log(result3)
                    this.listPlantConseil = result3
                    if (this.listPlantConseil.findIndex(element => element.nom == this.last_plant_nom) != -1) {
                      console.log(this.listPlantConseil.find(element => element.nom == this.last_plant_nom).nom)
                      this.shuffleArray(this.listPlantConseil)
                      this.listPlantConseil.splice(this.listPlantConseil.findIndex(element => element.nom == this.last_plant_nom), 1)
                    }else{
                      this.shuffleArray(this.listPlantConseil)
                    }
                  }
                )
              } else {
                this.listPlantConseil = res;
                if (this.listPlantConseil.findIndex(element => element.nom == this.last_plant_nom) != -1) {
                  console.log(this.listPlantConseil.find(element => element.nom == this.last_plant_nom).nom)
                  this.shuffleArray(this.listPlantConseil)
                  this.listPlantConseil.splice(this.listPlantConseil.findIndex(element => element.nom == this.last_plant_nom), 1)
                }else{
                  this.shuffleArray(this.listPlantConseil)
                }
              }
            }, err => {
              console.log(err)
            }
          )
        }, err => {
          console.log(err)
        }
      )
    } else {
      this.diasbled_tooltip = true
    }
  }

  ConseilOuvrir() {
    if (!!this.date_plantation) {
      $("#conseil").show("fast", "swing");
    } else {
      $("#btn-conseil").addClass("shake")
      setTimeout(function () {
        $("#btn-conseil").removeClass("shake")
      }, 1000);
    }
  }

  cancelConseil() {
    $("#conseil").hide("fast", "swing");
  }

  get_composant(a) {
    if (a == "a")
      return "azote";
    else if (a == "ph")
      return "phosphore";
    else if (a == "po")
      return "potassium"
  }

  shuffleArray(array){
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
