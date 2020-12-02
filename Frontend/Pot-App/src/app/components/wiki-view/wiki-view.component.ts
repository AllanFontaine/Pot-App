import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { WikiService } from 'app/service/wiki.service';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.css']
})
export class WikiViewComponent implements OnInit {

  public plants : any[];
  public paginatorLength : number;
  formGroup : FormGroup;
  countPlant : number;
  search_timeout : any;

  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    
    this.wikiService.get_plant_offset_limit(0,10).subscribe(
      result => this.plants = result,
      error => console.log(error),
      () => {
        console.log(this.plants);
      }
    )
   
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.formGroup.get('name').valueChanges.subscribe(s => {
      if (this.search_timeout) {
        clearTimeout(this.search_timeout);
        this.search_timeout = null;
      }

      this.search_timeout = setTimeout(() => {
        this.search_plant();
      }, 1000);
    });
    this.search_plant()
  }

  search_plant() {
    if (this.formGroup.invalid) {
      this.wikiService.get_plants().subscribe(
        result => this.plants = result, 
        error => console.log(error),
        () => {
          this.paginatorLength = this.plants.length;
        }
      )
      return false;
    }
    
    this.wikiService.get_plant_by_name(this.formGroup.get("name").value).subscribe(
      result => this.plants = result,
      error => console.log(error),
      () => {
        this.paginatorLength = this.plants.length
      }
    )
  }

  onPageChange(event: PageEvent) {
    let firstIndex = event.pageSize * event.pageIndex;
    let lastIndex = firstIndex + event.pageSize;
    console.log(firstIndex);
    if (lastIndex > this.paginatorLength) {
      lastIndex = this.paginatorLength
    }
    console.log(lastIndex)
    this.wikiService.get_plant_offset_limit(firstIndex, lastIndex).subscribe(
      result => {
        this.plants = result
      },
      error => {
        console.log(error)
      },
      () => {
        console.log(this.plants)
      }
    )
  }
}
