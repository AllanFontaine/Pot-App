import { Component, OnInit } from '@angular/core';
import { WikiService } from 'app/service/wiki.service';

@Component({
  selector: 'app-single-plant-detail',
  templateUrl: './single-plant-detail.component.html',
  styleUrls: ['./single-plant-detail.component.css']
})
export class SinglePlantDetailComponent implements OnInit {

  plant;
  plantWikipedia;

  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    
  }

}
