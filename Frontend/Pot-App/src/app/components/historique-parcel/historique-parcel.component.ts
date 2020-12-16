import { ElementRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalGardenService } from 'app/service/personal-garden.service';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { getEffectiveTypeParameterDeclarations } from 'typescript';
@Component({
  selector: 'app-historique-parcel',
  templateUrl: './historique-parcel.component.html',
  styleUrls: ['./historique-parcel.component.css']
})
export class HistoriqueParcelComponent implements OnInit {

  my_parcel = [];

  constructor(private garden: PersonalGardenService, public router: Router, private targetElem: ElementRef) {
  }

  ngOnInit(): void {
    this.startParcels("date", "ASC")
  }
  deleteParcel(id) {
    Swal.fire({
      icon: 'warning',
      title: 'ATTENTION: Les données supprimées ne pourront pas être récupérées',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Supprimer`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {

        this.garden.erase_parcel(id).subscribe(res => {
        },
          err => console.log(err)
        );
        Swal.fire('Données supprimées', '', 'success')
        this.ngOnInit()
      }
    })

  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.startParcels("date", "ASC")
      return;
    }

    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'numparcel': this.getParcels('order_numparcel');
      case 'nameplant': this.getParcels('order_nameplant');
      case 'scientname': this.getParcels('order_scientname');
      case 'date': this.getParcels('order_date');
      case 'orderstat': this.getParcels('order_stat');
      default: 0;
    }
  };

  startParcels(orderBy, orderDirection) {
    this.garden.get_my_parcels_ordered(orderBy, orderDirection).subscribe(
      res => {
        this.my_parcel = res
      },
      err => console.log(err)
    )
  }
  getParcels(sorter) {
    if (sorter.direction === "desc") {
      this.startParcels(sorter.active, "DSC")
    } else {
      this.startParcels(sorter.active, "ASC")
    }
  }

  navigToAdd(): void {
    this.router.navigate(['/add-parcel'])
  }

}
