import { Component, OnInit } from '@angular/core';
import {PersonalGardenService} from "../../services/personal-garden.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-parcel',
  templateUrl: './single-parcel.component.html',
  styleUrls: ['./single-parcel.component.css']
})
export class SingleParcelComponent implements OnInit {

  id_parcel: string;
  parcel: {
    url: string,
    id: number,
    user: number,
    numero_parcelle:number,
    taille: number,
    plante: {
      url: string,
      id: number,
      nom: string,
      taux_ideal_eau: string,
      description: string,
      image: string,
    },
  };

  constructor(private garden: PersonalGardenService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.init_get_parcel()
  }

  init_get_parcel(){
    this.id_parcel = this.route.snapshot.params['id'];
    this.garden.get_one_parcel(this.id_parcel).subscribe(
      result => {
        this.parcel = result;
        console.log(this.parcel);
      },
      error => console.log(error),
    )
  }

  is_empty(obj):boolean{
    return Object.keys(obj).length === 0
  }

}
