import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  breakpoint: number;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (window.innerWidth <= 1150 && window.innerWidth >= 650) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 650) ? 1 : 3;
    }
  }
  onResize(event) {
    if (window.innerWidth <= 1150 && window.innerWidth >= 650) {
      this.breakpoint = 2
    } else {
      this.breakpoint = (window.innerWidth <= 650) ? 1 : 3;
    }
  }
  sendToGithub(name: string) {
    window.location.href = "https://github.com/" + name;
  }
}
