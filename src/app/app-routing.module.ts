import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {UserdataComponent} from './userdata/userdata.component';
import { ServiciiComponent } from './servicii/servicii.component';
import { RezervationComponent } from './rezervation/rezervation.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthenticationGuard} from './auth-guard/authentication.guard';
import {UserCheckGuard} from './auth-guard/user-check.guard';
import {AdminCheckGuard} from './auth-guard/admin-check.guard';



const routes: Routes = [
  {path: '', component: HomeComponent},
{path: 'rezervation', component: RezervationComponent},
{path: 'servicii', component: ServiciiComponent},
{path: 'user', component: BoardUserComponent, canActivate:[AuthenticationGuard], canLoad:[UserCheckGuard], loadChildren: () => import('./user-panel/user-panel.module').then(m => m.UserPanelModule)},
{path: 'admin', component: BoardAdminComponent, canActivate:[AuthenticationGuard], canLoad:[AdminCheckGuard], loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)},
{path: 'room/:id', component: RoomReservationComponent},
{path: 'userdetails', component: UserdataComponent},
  {path: 'pagenotfound', component: PageNotFoundComponent},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
