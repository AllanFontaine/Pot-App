import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WikiService } from 'app/service/wiki.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const require: any;
const wtf = require('wtf_wikipedia');

@Component({
  selector: 'app-single-plant-detail',
  templateUrl: './single-plant-detail.component.html',
  styleUrls: ['./single-plant-detail.component.css']
})
export class SinglePlantDetailComponent implements OnInit, OnDestroy {

  plant;
  plantWikipedia;

  loading: boolean = true;

  private destroyed$: Subject<void>;


  constructor(private wikiService: WikiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.destroyed$ = new Subject();
  }

  ngOnInit(): void {
    this.plantWikipedia = [];
    this.activatedRoute.paramMap.pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has("plant_id")) {
          this.wikiService.get_plant(parseInt(paramMap.get("plant_id"), 10)).subscribe(
            result => {
              this.plant = result;
            },
            error => console.log(error),
          );
        }
        if (paramMap.has("nom_wiki")) {
          wtf
            .fetch(paramMap.get('nom_wiki'), 'fr')
            .then((result) => {
              this.plantWikipedia = result.data.sections.slice(1, 4);
              for (let i = 0; i < this.plantWikipedia.length; i++) {
                this.plantWikipedia[i].data.wiki = wtf(this.plantWikipedia[i].data.wiki).text();
                this.plantWikipedia[i].data.wiki = this.plantWikipedia[i].data.wiki.replace(/\*/g, '<br><br>*');

              }
              this.loading = false;
            })
        }
      });
  }

  onReturn(): void {
    console.log(1);
    this.router.navigate(["/wiki"]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
