import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Mes Parcelles', icon: 'dashboard', class: 'dash' },
  { path: '/wiki', title: 'Wiki', icon: 'chrome_reader_mode', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: 'dash' },
  { path: '/historique', title: 'Historique', icon: 'archive', class: 'dash' },
  { path: '/shop', title: 'Magasin', icon: 'shopping_cart', class: '' },
  { path: '/about-us', title: 'About us', icon: 'group', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  classes;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.textMuted();
    if (this.authService.LoggedIn()) {
      $('.dash').tooltip('disable')
    }
    $('[data-toggle="tooltip"]').tooltip()
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  textMuted() {
    if (!this.authService.LoggedIn()) {
      console.log("je change de couleur");
      this.classes = document.getElementsByClassName("dash");
      console.log(this.classes);
      for (let i = 0; i < this.classes.length; i++) {
        console.log(this.classes[i].className);
        this.classes[i].className += " text-muted text-gray";
      }
    }
  }
  logoutCheck() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
