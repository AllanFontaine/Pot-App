import { Component, OnInit } from '@angular/core';
import {PersonalGardenService} from "../../services/personal-garden.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single-parcel',
  templateUrl: './single-parcel.component.html',
  styleUrls: ['./single-parcel.component.css']
})
export class SingleParcelComponent implements OnInit {

  id_parcel: string;
  parcel: [];
  plante:[];

  constructor(private garden: PersonalGardenService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_parcel = this.route.snapshot.params['id'];
    this.garden.get_one_parcel(this.id_parcel).subscribe(
      result => {
        this.parcel = result;
        this.plante = result.planteId
        console.log(this.parcel)
      },
      error => console.log(error),
    )
  }

  is_empty(obj):boolean{
    return Object.keys(obj).length === 0
  }

  delete_parcel() {
    this.id_parcel = this.parcel["id"]
    this.parcel["planteId"] = this.plante["id"]
    this.parcel["estUtilise"]= false
    delete this.parcel["id"]
    console.log("PARCELLE APRES")
    console.log(this.parcel)
    this.garden.delete_parcel(this.id_parcel, this.parcel).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['/garden'])
        alert("votre parcelle à bien été effacer")
      }, err => console.log(err)
    )
  }
}
