import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Mes Parcelles',  icon: 'dashboard', class: '' },
    { path: '/wiki', title: 'Wiki', icon: 'chrome_reader_mode', class: ''},
    { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
    { path: '/historique', title: 'Historique',  icon: 'archive', class: '' },
    { path: '/shop', title: 'Magasin',  icon: 'shopping_cart', class: '' },
    { path: '/about-us', title: 'About us',  icon: 'group', class: '' },
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
