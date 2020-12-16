import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  @Input() currentURL;

  constructor(private router: Router, private adminLayoutComponent: AdminLayoutComponent) {; }

  ngOnInit() {
    console.log(this.currentURL)
  }
  
  navigate() {
    this.router.navigate(['/about-us'])
  }
}
