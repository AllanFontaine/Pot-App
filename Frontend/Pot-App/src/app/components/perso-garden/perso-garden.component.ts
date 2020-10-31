import {Component, OnInit} from '@angular/core';
import {PersonalGardenService} from "../../services/personal-garden.service";

@Component({
  selector: 'app-perso-garden',
  templateUrl: './perso-garden.component.html',
  styleUrls: ['./perso-garden.component.css']
})

export class PersoGardenComponent implements OnInit {

  my_garden = [];

  constructor(private garden: PersonalGardenService) { }

  ngOnInit(): void {
    this.garden.get_my_garden().subscribe(
      res => {"GG   "+console.log(res)},
      err => console.log(err)
    )
  }

}
