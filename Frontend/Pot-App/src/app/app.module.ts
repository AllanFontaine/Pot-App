import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { WikiViewComponent } from './components/wiki-view/wiki-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { NavViewComponent } from './components/nav-view/nav-view.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'

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
    WikiViewComponent,
    LoginViewComponent,
    NavViewComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
