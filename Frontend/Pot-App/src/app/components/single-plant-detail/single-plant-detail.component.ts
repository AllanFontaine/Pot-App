import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WikiService } from 'app/service/wiki.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const require : any;
const wtf = require('wtf_wikipedia');

@Component({
  selector: 'app-single-plant-detail',
  templateUrl: './single-plant-detail.component.html',
  styleUrls: ['./single-plant-detail.component.css']
})
export class SinglePlantDetailComponent implements OnInit, OnDestroy {

  plant;
  plantWikipedia;

  loading : boolean = false;

  private destroyed$: Subject<void>;


  constructor(private wikiService: WikiService, private activatedRoute: ActivatedRoute) { 
    this.destroyed$ = new Subject();  
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has("plant_id")) {
          this.wikiService.get_plant(parseInt(paramMap.get("plant_id"), 10)).subscribe(
            result => {
              this.plant = result;
              this.loading = false;
            }, 
            error => console.log(error),
          );
        }
        if (paramMap.has("nom_wiki")) {
         wtf
         .fetch(paramMap.get('nom_wiki'), 'fr')
         .then((result) => {
           console.log(result.data.sections);
           this.plantWikipedia = result.data.sections.slice(1, 4);
           console.log(this.plantWikipedia);
         })
        }
      });
  }

  ngOnDestroy() : void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
