import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import {LoginViewComponent} from "./components/login-view/login-view.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {HomeViewComponent} from "./components/home-view/home-view.component";
import {AuthGuard} from "./service/auth-guard.service";
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [ {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
  },
  { path: '',          component: HomeViewComponent },
  { path: 'login',          component: LoginViewComponent },
  { path: 'register',          component: SignUpComponent },
  { path: 'home',           component: HomeViewComponent },
  { path: 'terms',      component: TermsAndConditionsComponent },
  { path: '**', component: NotFoundComponent}
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
