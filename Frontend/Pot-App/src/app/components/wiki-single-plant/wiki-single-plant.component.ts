import { Component, Input, OnInit } from '@angular/core';
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

 

  constructor(
    private wikiService: WikiService,
    private router: Router) { }


  ngOnInit(): void {
  }

  show_plant() : void {
    this.wikiService.get_plant(this.id).subscribe(
      result => console.log(result), 
      error => console.log(error),
    );
    this.router.navigate(['/wiki/' + this.id +'/' + this.url_wiki ]);
  }
}
