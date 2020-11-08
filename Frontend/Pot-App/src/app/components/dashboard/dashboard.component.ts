import { Component, OnInit } from '@angular/core';
import {PersonalGardenService} from '../../service/personal-garden.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    my_parcel = [];

    constructor(private garden: PersonalGardenService, public router: Router) {
    }

    ngOnInit(): void {
        this.garden.get_my_active_parcels(localStorage.getItem('user_id')).subscribe(
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
