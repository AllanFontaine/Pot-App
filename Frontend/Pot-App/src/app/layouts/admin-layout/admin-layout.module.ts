import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { TypographyComponent } from '../../components/typography/typography.component';
import { IconsComponent } from '../../components/icons/icons.component';
import { MapsComponent } from '../../components/maps/maps.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { UpgradeComponent } from '../../components/upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {AuthGuard} from '../../service/auth-guard.service';
import {AuthService} from '../../service/auth.service';
import {WikiService} from '../../service/wiki.service';
import {PersonalGardenService} from '../../service/personal-garden.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../../service/token-interceptor.service';
import {LoginViewComponent} from '../../components/login-view/login-view.component';
import {HomeViewComponent} from '../../components/home-view/home-view.component';
import {HistoriqueParcelComponent} from '../../components/historique-parcel/historique-parcel.component';
import {SingleParcelComponent} from '../../components/single-parcel/single-parcel.component';
import {AddParcelComponent} from '../../components/add-parcel/add-parcel.component';
import {MatRadioModule} from '@angular/material/radio';
import {SignUpComponent} from '../../components/sign-up/sign-up.component';
import {ResetPasswordComponent} from '../../components/reset-password/reset-password.component';
import {WikiViewComponent} from '../../components/wiki-view/wiki-view.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DatePipe} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    WikiViewComponent,
    SignUpComponent,
    ResetPasswordComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginViewComponent,
    HomeViewComponent,
    HistoriqueParcelComponent,
    SingleParcelComponent,
    AddParcelComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    PersonalGardenService,
    WikiService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    DatePipe,
    
  ]
})

export class AdminLayoutModule {}
