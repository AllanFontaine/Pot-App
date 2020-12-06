import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalGardenService } from '../../service/personal-garden.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-single-parcel',
  templateUrl: './single-parcel.component.html',
  styleUrls: ['./single-parcel.component.css'],
})
export class SingleParcelComponent implements OnInit {
  id_parcel: string;
  parcel: [];
  plante: [];

  constructor(
    private garden: PersonalGardenService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.id_parcel = this.route.snapshot.params['user_id'];
    console.log('PARAMETRE');
    console.log(this.id_parcel);
    this.garden.get_one_parcel(this.id_parcel).subscribe(
      (result) => {
        this.parcel = result;
        this.plante = result.planteId;
        console.log(this.parcel);
      },
      (error) => console.log(error)
    );
  }

  is_empty(obj): boolean {
    return Object.keys(obj).length === 0;
  }


  //SUPPRIMER LA PARCELLE

  delete_parcel() {
    Swal.fire({
      title: 'Etes vous sur?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Supprimer de mes parcelles`,
      denyButtonText: `Supprimer et supprimer de mon historique`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.id_parcel = this.parcel['id'];
        this.parcel['planteId'] = this.plante['id'];
        this.parcel['estUtilise'] = false;
        delete this.parcel['id'];
        console.log('PARCELLE APRES');
        console.log(this.parcel);
        this.garden.delete_parcel(this.id_parcel, this.parcel).subscribe(
          (result) => {
            console.log(result);
            this.router.navigate(['/dashboard']);
            Swal.fire({
              icon: 'success',
              title: 'Parcelle supprimée',
            });
          },
          (err) => console.log(err)
        );
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Toutes suppression ne sera pas réversible',
          showDenyButton: true,
          showCancelButton: true,
          showConfirmButton: false,
          denyButtonText: `Supprimer`,
        }).then((result) => {
          if (result.isDenied) {
            console.log(this.id_parcel)
            this.garden.erase_parcel(this.id_parcel).subscribe(
              result => {
                this.router.navigate(['/dashboard'])
                Swal.fire({
                  icon: 'success',
                  title: 'Parcelle supprimée définitivement',
                });
              }, err => console.log(err)
            )
          }
        })
      }
    })
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
