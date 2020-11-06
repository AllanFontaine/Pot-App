import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from './services/auth.service';
import { WikiService } from './services/wiki.service';

import { AppComponent } from './app.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { WikiViewComponent } from './components/wiki-view/wiki-view.component';
import { NavViewComponent } from './components/nav-view/nav-view.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { LoginViewComponent } from './components/login-view/login-view.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PersoGardenComponent } from './components/perso-garden/perso-garden.component';
import {appRoutes} from "./routes";
import { AuthGuard} from "./services/auth-guard.service";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {PersonalGardenService} from "./services/personal-garden.service";
import { AddParcelComponent } from './components/add-parcel/add-parcel.component';
import {MatRadioModule} from '@angular/material/radio';
import { SingleParcelComponent } from './components/single-parcel/single-parcel.component';
import { HistoriqueParcelComponent } from './components/historique-parcel/historique-parcel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    LoginViewComponent,
    WikiViewComponent,
    NavViewComponent,
    ResetPasswordComponent,
    SignUpComponent,
    PersoGardenComponent,
    AddParcelComponent,
    SingleParcelComponent,
    HistoriqueParcelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    PersonalGardenService,
    WikiService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
