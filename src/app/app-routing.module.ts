import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';



import { ServiciiComponent } from './servicii/servicii.component';

import { RezervationComponent } from './rezervation/rezervation.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomeComponent},

{path:'rezervation',component:RezervationComponent},
{path:'servicii',component:ServiciiComponent},
{path:'user',component:BoardUserComponent},
{path:'admin',component:BoardAdminComponent},
{path:'room/:id',component:RoomReservationComponent}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
