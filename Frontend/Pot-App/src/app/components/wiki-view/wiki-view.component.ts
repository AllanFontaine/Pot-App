import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { WikiService } from 'app/service/wiki.service';

@Component({
  selector: 'app-wiki-view',
  templateUrl: './wiki-view.component.html',
  styleUrls: ['./wiki-view.component.css']
})
export class WikiViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(Input) input: Input;

  public plants: any[];
  public paginatorLength: number;
  formGroup: FormGroup;
  tri = "nom";
  order = "ASC";
  countPlant: number;
  search_timeout: any;

  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    /*
    this.wikiService.get_plant_offset_limit(0,10).subscribe(
      result => this.plants = result,
      error => console.log(error),
      () => {
        console.log(this.plants);
      }
    )
   */
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
      this.wikiService.offset = 0;
      this.wikiService.limit = 10;
      this.wikiService.get_plant_offset_limit(this.wikiService.offset, this.wikiService.limit, this.order, this.tri).subscribe(
        (result) => {
          console.log(result)
          this.wikiService.length = 12;
          
          this.setLength(this.wikiService.length);
          this.plants = result;
        },
        error => console.log(error),

      )
      return false;
    }

    this.wikiService.get_plant_by_name(this.formGroup.get("name").value, this.order, this.tri).subscribe(
      (result) => {
        this.wikiService.limit = result.length;
        if (result.length < this.paginator.pageIndex * this.paginator.length && this.paginator.pageIndex != 0) {
          this.wikiService.pageIndex = this.wikiService.pageIndex - 1;
          this.setPage(this.wikiService.pageIndex);
        }
        this.wikiService.length = result.length;
        this.setLength(this.wikiService.length);
        this.plants = result

      },
      error => console.log(error),

    )
  }

  onChangeTri(value) {

    let stripped = value.split(" ", 2);
    this.tri = stripped[0];
    this.order = stripped[1];
    if (this.formGroup.value.name == "") {
      this.wikiService.get_plant_offset_limit(this.wikiService.offset, this.wikiService.limit, this.order, this.tri).subscribe(
        (result) => {
          console.log(result)
          this.wikiService.length = 12;
          
          this.setLength(this.wikiService.length);
          this.plants = result;
        },
        error => console.log(error),
      )
    }
    else {
      console.log(1)
      this.wikiService.get_plant_by_name(this.formGroup.value.name, this.order, this.tri).subscribe(
        (result) => {
          this.plants = result;
        }
      )
    }
  }

  onPageChange(event: PageEvent) {
    let firstIndex = event.pageSize * event.pageIndex;
    let lastIndex = firstIndex + event.pageSize;
    this.wikiService.offset = firstIndex;
    this.wikiService.limit = lastIndex;
    this.wikiService.pageIndex = event.pageIndex;
    if (lastIndex > this.wikiService.length) {
      lastIndex = this.wikiService.length
    }
    this.wikiService.get_plant_offset_limit(firstIndex, lastIndex, this.order, this.tri).subscribe(
      result => {
        this.plants = result
      },
      error => {
        console.log(error)
      });
  }

  setPage(index: number) {
    this.paginator.pageIndex = index;
  }

  setLength(length: number) {
    this.paginator.length = length;
  }
}