import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { TypographyComponent } from '../../components/typography/typography.component';
import { IconsComponent } from '../../components/icons/icons.component';
import { MapsComponent } from '../../components/maps/maps.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { UpgradeComponent } from '../../components/upgrade/upgrade.component';
import {HomeViewComponent} from '../../components/home-view/home-view.component';
import {LoginViewComponent} from '../../components/login-view/login-view.component';
import {AuthGuard} from '../../service/auth-guard.service';
import {HistoriqueParcelComponent} from '../../components/historique-parcel/historique-parcel.component';
import {SingleParcelComponent} from '../../components/single-parcel/single-parcel.component';
import {AddParcelComponent} from '../../components/add-parcel/add-parcel.component';
import { WikiViewComponent } from 'app/components/wiki-view/wiki-view.component';
import {SignUpComponent} from "../../components/sign-up/sign-up.component";
import { AboutUsComponent } from 'app/components/about-us/about-us.component';
import { ShopComponent } from '../../components/shop/shop.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: '',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:user_id',      component: SingleParcelComponent, canActivate: [AuthGuard] },
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'table-list',     component: TableListComponent, canActivate: [AuthGuard] },
    { path: 'typography',     component: TypographyComponent, canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'notifications',  component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'add-parcel',     component: AddParcelComponent, canActivate: [AuthGuard] },
    { path: 'login',          component: LoginViewComponent },
    { path: 'register',          component: SignUpComponent },
    { path: 'home',           component: HomeViewComponent },
    { path: 'historique',     component: HistoriqueParcelComponent, canActivate: [AuthGuard] },
    { path: 'wiki',           component: WikiViewComponent},
    { path: 'about-us',           component: AboutUsComponent},
    { path: 'shop',           component: ShopComponent},
];
