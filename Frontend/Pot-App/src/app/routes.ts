import {Routes} from "@angular/router";
import {HomeViewComponent} from "./components/home-view/home-view.component";
import {LoginViewComponent} from "./components/login-view/login-view.component";
import {WikiViewComponent} from "./components/wiki-view/wiki-view.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {PersoGardenComponent} from "./components/perso-garden/perso-garden.component";
import {AuthGuard} from "./services/auth-guard.service";
import {AddParcelComponent} from "./components/add-parcel/add-parcel.component";
import {SingleParcelComponent} from "./components/single-parcel/single-parcel.component";
import { HistoriqueParcelComponent } from './components/historique-parcel/historique-parcel.component';

export const appRoutes : Routes = [
  {path : 'home', component: HomeViewComponent},
  {path : 'wiki', component: WikiViewComponent},
  {path : 'resetPassword', component: ResetPasswordComponent},
  {path : 'login', component: LoginViewComponent,},
  {path : 'register', component: SignUpComponent,},
  {path : 'garden', component: PersoGardenComponent, canActivate: [AuthGuard]},
  {path : 'historique', component: HistoriqueParcelComponent, canActivate: [AuthGuard]},
  {path : 'add-parcel', component: AddParcelComponent, canActivate: [AuthGuard]},
  {path : 'garden/:id', component: SingleParcelComponent, canActivate: [AuthGuard]},
  {path : '', redirectTo: '/home', pathMatch: 'full'},
]
