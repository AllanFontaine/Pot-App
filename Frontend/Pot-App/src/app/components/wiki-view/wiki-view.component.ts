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

  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    this.wikiService.get_plants().subscribe(
      result => this.plants = result, 
      error => console.log(error),
      () => {
        console.log(this.plants);
        this.paginatorLength = this.plants.length;
      }
    )
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
  }

  search_plant(form: NgForm) {
    console.log(form.value['name']);
    this.wikiService.get_plant_by_name(form.value['name']).subscribe(
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
