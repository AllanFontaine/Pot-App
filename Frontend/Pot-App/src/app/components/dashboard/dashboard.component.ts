import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { Router } from '@angular/router';
import { AddParcelComponent } from '../add-parcel/add-parcel.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  parcel_db = [];
  amountParcels;
  my_parcels = [];
  breakpoint: number;
  filtersLoaded: Promise<boolean>;
  isLoaded: boolean = false;

  constructor(
    private garden: PersonalGardenService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.garden
      .get_my_active_parcels()
      .subscribe(
        (res) => {
          this.parcel_db = res;
          this.parcel_db.sort(
            (a, b) =>
              parseFloat(a.numero_parcelle) - parseFloat(b.numero_parcelle)
          );
          console.log(this.parcel_db);
          this.garden.get_profile().subscribe(
            (res) => {
              this.amountParcels = res[0]['nombre_parcelle'];
              this.my_parcels = Array(this.amountParcels).fill({ estUtilise: false });
              this.orderParcels();
            },
            (err) => console.log(err)
          );
        },
        (err) => console.log(err)
      );
    if (window.innerWidth <= 900 && window.innerWidth >= 450) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 900) ? 1 : 4;
    }


  }
  onResize(event) {
    if (window.innerWidth <= 900 && window.innerWidth >= 450) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 900) ? 1 : 4;
    }
  }

  orderParcels() {
    for (let i = 0; i < this.parcel_db.length; i++) {
      this.my_parcels[this.parcel_db[i].numero_parcelle - 1] = this.parcel_db[
        i
      ];
    }
    this.isLoaded = true
  }
  openDialogForm(numparcel): void {
    console.log(numparcel)
    console.log(this.my_parcels)
    let dialogRef = this.dialog.open(AddParcelComponent, {
      data: {
        num: numparcel + 1,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'SUCCESS') {
        Swal.fire({
          icon: 'success',
          title: 'Parcelle bien ajoutée',
          text: "Veillez bien à régler la hauteur de l'arrosage",
          footer: 'Cette information se trouve dans les détails de la parcelle'
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngOnInit();
          }
        });
      } else if (result === 'ERROR') {
        Swal.fire({
          icon: 'error',
          title: 'ERREUR: Vérifiez les données entrées et réessayez',
        })
      }
    });
  }

  navigToAdd(): void {
    this.router.navigate(['/add-parcel']);
  }

  navigToParcel(id): void {
    this.router.navigate(['/dashboard/' + id]);
  }
  navigShop(): void {
    this.router.navigate(['/shop']);
  }
}
