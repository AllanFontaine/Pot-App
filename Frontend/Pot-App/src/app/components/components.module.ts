import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatMenuModule} from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import {NavbarHomeComponent} from './navbar-home/navbar-home.component';
import { GetLoggedInComponent } from './get-logged-in/get-logged-in.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
    ],
  declarations: [
    FooterComponent,
    NavbarHomeComponent,
    SidebarComponent,
    NavbarComponent,
    GetLoggedInComponent,
  
  ],
    exports: [
        FooterComponent,
        NavbarHomeComponent,
        SidebarComponent,
        NavbarComponent
    ]
})
export class ComponentsModule { }
