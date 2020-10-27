import {Routes} from "@angular/router";
import {HomeViewComponent} from "./components/home-view/home-view.component";
import {LoginViewComponent} from "./components/login-view/login-view.component";
import {WikiViewComponent} from "./components/wiki-view/wiki-view.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

export const appRoutes : Routes = [
  {path : 'home', component: HomeViewComponent},
  {path : 'wiki', component: WikiViewComponent},
  {path : 'resetPassword', component: ResetPasswordComponent},
  {path : 'login', component: LoginViewComponent,},
  {path : 'register', component: SignUpComponent,},
  {path : '', redirectTo: '/home', pathMatch: 'full'},
]
