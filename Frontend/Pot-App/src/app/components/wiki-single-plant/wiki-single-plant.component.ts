import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WikiService } from 'app/service/wiki.service';

@Component({
  selector: 'app-wiki-single-plant',
  templateUrl: './wiki-single-plant.component.html',
  styleUrls: ['./wiki-single-plant.component.css']
})
export class WikiSinglePlantComponent implements OnInit {

  @Input() id : number;
  @Input() nom : string;
  @Input() nom_scientifique : string;
  @Input() recolte_en_jours : number;
  @Input() url_wiki : string;
  @Input() image : string;
  @Input() saison_fin : string;
  @Input() saison_debut : string;

 
  constructor(public dialog: MatDialog,
              private router: Router) { }


  ngOnInit(): void {
  }

  show_plant() : void {
    
    this.router.navigate(['/wiki/' + this.id + '/' + this.url_wiki]);
  }
}
