import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalGardenService } from 'app/service/personal-garden.service';

@Component({
  selector: 'app-historique-parcel',
  templateUrl: './historique-parcel.component.html',
  styleUrls: ['./historique-parcel.component.css']
})
export class HistoriqueParcelComponent implements OnInit {

  my_parcel = [];

  constructor(private garden: PersonalGardenService, public router: Router) {
  }

  ngOnInit(): void {
    this.garden.get_my_parcels(localStorage.getItem('user_id')).subscribe(
      res => {
        this.my_parcel = res
      },
      err => console.log(err)
    )
  }

  navigToAdd(): void {
    this.router.navigate(['/add-parcel'])
  }

}
