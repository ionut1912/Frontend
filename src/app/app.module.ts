import {NavbarComponent} from './navbar/navbar.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RezervationComponent} from './rezervation/rezervation.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ServiciiComponent} from './servicii/servicii.component';
import {FooterComponent} from './footer/footer.component';
import {ModalComponent} from './modal/modal.component';
import {Modal2Component} from './modal2/modal2.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {VideoModule} from './video/video.module';
import {RegisterComponent} from './register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {LoginComponent} from './login/login.component';
import {RoominfoComponent} from './roominfo/roominfo.component';
import {RoomReservationComponent} from './room-reservation/room-reservation.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {MatListModule} from '@angular/material/list';
import {UserdataComponent} from './userdata/userdata.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

import {MatTabsModule} from '@angular/material/tabs';
import { ViewReservationsComponent} from './view-reservations/view-reservations.component';
import  {EditRezervationComponent} from './edit-rezervation/edit-rezervation.component';
import {RoomReviewComponent} from './room-review/room-review.component';
import {HotelReviewComponent} from './hotel-review/hotel-review.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import  {EditRoom} from './edit-room/edit-room.component';
import  {DeleteRezervationComponent} from './delete-rezervation/delete-rezervation.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {ViewRoomsComponent} from './view-rooms/view-rooms.component';
import  {AddRoom} from './add-room/add-room.component';
import  {DeleteUser} from './delete-user/delete-user.component';

import { ViewAllReservationsComponent } from './view-all-reservations/view-all-reservations.component';
import {DeleteRoom} from './delete-room/delete-room.component';
import {EditUser} from './edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewRoomImagesComponent } from './view-room-images/view-room-images.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ViewRoomInfoComponent } from './view-room-info/view-room-info.component';





@NgModule({
  declarations: [
    AppComponent,
    RezervationComponent,
    HomeComponent,
    ServiciiComponent,
    FooterComponent,
    ModalComponent,
    Modal2Component,
    RegisterComponent,
    BoardAdminComponent,
    BoardUserComponent,
    LoginComponent,
    NavbarComponent,
    EditRoom,
    DeleteRoom,
    RoominfoComponent,
    RoomReservationComponent,
    UserdataComponent,
    ViewReservationsComponent,
    RoomReviewComponent,
    HotelReviewComponent,

    EditRezervationComponent,
    DeleteRezervationComponent,
    ViewUsersComponent,
    ViewRoomsComponent,
    AddRoom,

    EditUser,
    DeleteUser,


    ViewAllReservationsComponent,


    EditRoom,
    DeleteRoom,
    PageNotFoundComponent,
    ViewRoomImagesComponent,
    ViewRoomInfoComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    VideoModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    SlickCarouselModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,

    MatSortModule,

MatSnackBarModule
  ],

  providers: [MatDatepickerModule],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ModalComponent]
})
export class AppModule {


}



