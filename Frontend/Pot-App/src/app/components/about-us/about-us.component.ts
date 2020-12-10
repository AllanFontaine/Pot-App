import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  breakpoint: number;
  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth <= 750 && window.innerWidth >= 450) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 750) ? 1 : 3;
    }
  }
onResize(event) {
    if (window.innerWidth <= 750 && window.innerWidth >= 450) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 750) ? 1 : 3;
    }
  }

}
