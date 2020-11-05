import {Component, Input, OnInit} from '@angular/core';
import {PersonalGardenService} from "../../services/personal-garden.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perso-garden',
  templateUrl: './perso-garden.component.html',
  styleUrls: ['./perso-garden.component.css']
})

export class PersoGardenComponent implements OnInit {

  my_parcel = [];

  constructor(private garden: PersonalGardenService, public router: Router) {
  }

  ngOnInit(): void {
    this.garden.get_my_parcels(localStorage.getItem('user_id')).subscribe(
      res => {
        this.my_parcel = res.parcelle

        console.log(this.my_parcel)
      },
      err => console.log(err)
    )
  }

  navigToAdd():void{
    this.router.navigate(['/add-parcel'])
  }
}
