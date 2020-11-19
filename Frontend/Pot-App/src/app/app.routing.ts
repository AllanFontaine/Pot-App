import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginViewComponent} from "./components/login-view/login-view.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeViewComponent} from "./components/home-view/home-view.component";
import {AuthGuard} from "./service/auth-guard.service";
const routes: Routes = [ {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }], canActivate: [AuthGuard]
  },
  { path: '',          component: HomeViewComponent },
  { path: 'login',          component: LoginViewComponent },
  { path: 'register',          component: SignUpComponent },
  { path: 'home',           component: HomeViewComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
