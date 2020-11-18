import { Component, OnInit } from '@angular/core';
import { WikiService } from 'app/service/wiki.service';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.css']
})
export class WikiViewComponent implements OnInit {

  plants : any[];

  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    this.wikiService.get_plants().subscribe(
      result => this.plants = result, 
      error => console.log(error),
      
    )
  }
}
