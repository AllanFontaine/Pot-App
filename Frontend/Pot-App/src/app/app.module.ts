import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from './services/auth.service';
import { WikiService } from './services/wiki.service';

import { AppComponent } from './app.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { WikiViewComponent } from './components/wiki-view/wiki-view.component';
import { NavViewComponent } from './components/nav-view/nav-view.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { LoginViewComponent } from './components/login-view/login-view.component';
import {MatToolbarModule} from '@angular/material/toolbar';

const appRoutes : Routes = [
  {path : "home", component: HomeViewComponent},
  {path : '', component: HomeViewComponent},
  {path : 'login', component: LoginViewComponent},
  {path : 'wiki', component: WikiViewComponent},
  {path : 'resetPassword', component: ResetPasswordComponent},
  {path : 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    LoginViewComponent,
    WikiViewComponent,
    NavViewComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    AuthService,
    WikiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
