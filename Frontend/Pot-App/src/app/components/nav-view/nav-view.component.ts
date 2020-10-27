import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.css']
})
export class NavViewComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
