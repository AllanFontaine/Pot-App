import {Component, OnInit} from '@angular/core';
import {PersonalGardenService} from "../../services/personal-garden.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perso-garden',
  templateUrl: './perso-garden.component.html',
  styleUrls: ['./perso-garden.component.css']
})

export class PersoGardenComponent implements OnInit {

  plants = [];
  parcels = [];
  my_parcel=[];

  constructor(private garden: PersonalGardenService, private router: Router) { }

  ngOnInit(): void {
    this.garden.get_plants().subscribe(
      res => {
        this.plants = res
      },
      err => console.log(err)
    )

    this.garden.get_parcel().subscribe(
      res => {
        this.parcels = res

        console.log(this.parcels[0].user === parseInt(localStorage.getItem('user_id')))
        // Suppression des parcels qui n'appartiennent pas à l'utilisateur
        for(let i=0; i < this.parcels.length;i++){
          if(this.parcels[i].user === parseInt(localStorage.getItem('user_id'))){
            this.my_parcel[i] = this.parcels[i]
          }
        }

        // Suppression des parcels qui n'appartiennent pas à l'utilisateur
        for(let i=0; i < this.my_parcel.length;i++){
          for(let j=0; j < this.plants.length;j++) {
            if (this.my_parcel[i].plante === this.plants[j].id) {
              this.my_parcel[i].image_plante = this.plants[j].image;
              this.my_parcel[i].nom_plante = this.plants[j].nom;
              this.my_parcel[i].description_plante = this.plants[j].description;
            }
          }
        }
      },
      err => console.log(err)
    )
  }

}
