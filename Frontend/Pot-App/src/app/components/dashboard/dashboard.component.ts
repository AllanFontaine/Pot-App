import { Component, OnInit } from '@angular/core';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  parcel_db = [];
  amountParcels;
  my_parcels = [];

  constructor(private garden: PersonalGardenService, public router: Router) {}

  ngOnInit(): void {
    this.garden
      .get_my_active_parcels(localStorage.getItem('user_id'))
      .subscribe(
        (res) => {
          this.parcel_db = res;
          this.parcel_db.sort(
            (a, b) =>
              parseFloat(a.numero_parcelle) - parseFloat(b.numero_parcelle)
          );
          console.log(this.parcel_db);
        },
        (err) => console.log(err)
      );

    this.garden.get_profile().subscribe(
      (res) => {
        this.amountParcels = res['nombre_parcelle'];
        this.my_parcels = Array(this.amountParcels).fill({ estUtilise: false });
        this.orderParcels();
      },
      (err) => console.log(err)
    );
  }

  orderParcels() {
    for (let i = 0; i < this.parcel_db.length; i++) {
      this.my_parcels[this.parcel_db[i].numero_parcelle - 1] = this.parcel_db[
        i
      ];
      console.log(this.my_parcels);
    }
  }
  parcelToArrayNumber(parcel_num) {
    for (let i = 0; i < this.parcel_db.length; i++) {
      if (this.parcel_db[i].numero_parcelle === parcel_num) {
        console.log(this.parcel_db[i]);
        return i;
      }
    }
    return -1;
  }

  navigToAdd(): void {
    this.router.navigate(['/add-parcel']);
  }
}
