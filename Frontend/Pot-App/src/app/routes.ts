import {Routes} from "@angular/router";
import {HomeViewComponent} from "./components/home-view/home-view.component";
import {LoginViewComponent} from "./components/user/login-view/login-view.component";
import {WikiViewComponent} from "./components/wiki-view/wiki-view.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {UserComponent} from "./components/user/user.component";

export const appRoutes : Routes = [
  {path : "home", component: HomeViewComponent},
  {path : 'wiki', component: WikiViewComponent},
  {path : 'resetPassword', component: ResetPasswordComponent},
  {
    path : 'login', component: UserComponent,
    children:[{path: '', component: LoginViewComponent}]
  },
  {
    path : 'signup', component: UserComponent,
    children:[{path: '', component: SignUpComponent}]
  },
  {path : '', redirectTo: '/login', pathMatch: 'full'},
]
