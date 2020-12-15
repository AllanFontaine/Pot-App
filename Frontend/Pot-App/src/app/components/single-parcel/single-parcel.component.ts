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
  loading: boolean = true;
  url_plante :string;
  countdownDate;
  x; demo:any;
  couleur = {'brown': 'brun', 'blue': 'bleu', 'green': 'vert'};

  constructor(
    private garden: PersonalGardenService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    var nom; var now;
    this.id_parcel = this.route.snapshot.params['user_id'];
    this.garden.get_one_parcel(this.id_parcel).subscribe(
      (result) => {
        this.parcel = result;
        this.plante = result.planteId;
        nom = this.plante['nom'].split(' ').join('_');
        this.url_plante = "http://localhost:4200/wiki/"+this.plante['id']+'/'+nom;
        this.loading = false;
        this.countdownDate = new Date(this.plante['date_semis_fin']).getTime();
        this.x = setInterval(() => {
          now = new Date().getTime();
          var distance = this.countdownDate - now; 
          var days = Math.floor(distance/(1000*60*60*24));
          var hours = Math.floor((distance %(1000*60*60*24)) / (1000*60*60));
          var minute = Math.floor((distance % (1000*60*60)) / (1000*60)); 
          var seconds = Math.floor((distance % (1000*60)) / 1000);
          this.demo = days + "d " + hours + "h " + minute + "m " + seconds + "s"
        })
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
