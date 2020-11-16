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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from '../../service/auth-guard.service';
import { AuthService } from '../../service/auth.service';
import { WikiService } from '../../service/wiki.service';
import { PersonalGardenService } from '../../service/personal-garden.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../../service/token-interceptor.service';
import { HistoriqueParcelComponent } from '../../components/historique-parcel/historique-parcel.component';
import { SingleParcelComponent } from '../../components/single-parcel/single-parcel.component';
import { AddParcelComponent } from '../../components/add-parcel/add-parcel.component';
import { LoginViewComponent } from '../../components/login-view/login-view.component'
import { MatRadioModule } from '@angular/material/radio';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { ResetPasswordComponent } from '../../components/reset-password/reset-password.component';
import { WikiViewComponent } from '../../components/wiki-view/wiki-view.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
    MatGridListModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    MatDialogModule,
    MatAutocompleteModule

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    WikiViewComponent,
    ResetPasswordComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    HistoriqueParcelComponent,
    SingleParcelComponent,
    AddParcelComponent,

  ],
  entryComponents: [AddParcelComponent],
  providers: [
    AuthGuard,
    AuthService,
    PersonalGardenService,
    WikiService,
    MatDialogModule,
    DatePipe,

  ],
})
export class AdminLayoutModule { }
