import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from '../_services/ReservationService.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserService} from '../_services/UserService.service';
import {UserData} from '../clases/UserData';
import {Reservation} from '../clases/Reservation';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {EditRezervationComponent} from '../edit-rezervation/edit-rezervation.component';
import {DeleteRezervationComponent} from '../delete-rezervation/delete-rezervation.component';
import {UserReservationHelper} from "../clases/UserReservationHelper";


export interface EditRezervationData {
  rezervationId: number,
  Name: string;
  Email: string;
  RoomType: string;
  Checkin: Date;
  Checkout: Date,
  dataSource: MatTableDataSource<Reservation>

}

export interface DeleteReervationData {
  rezervationId: number,
  dataSource: MatTableDataSource<Reservation>
}

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit {
  userDetails: UserData = new UserData();
  columns: string[] = ['reservationid', 'roomid', 'name', 'email', 'roomtype', 'checkin', 'checkout', 'action'];
  rezervationInfo: UserReservationHelper[] = [];
  reservation: Reservation = new Reservation();
  date1: FormControl[] = [];
  date2: FormControl[] = [];

  constructor(private  reservationService: ReservationService, private  tokenStorage: TokenStorageService, private  userService: UserService, public  dialog: MatDialog) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id!: number;
  rezervationNotDeleted: UserReservationHelper[] = [];

  public dataSource = new MatTableDataSource<UserReservationHelper>();

  ngOnInit(): void {
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInfo => {
      this.userDetails = userInfo;

      this.reservationService.getRezervationByUserId(this.userDetails.userid).subscribe(rezervation => {
        this.rezervationInfo = rezervation;
        this.rezervationNotDeleted = this.rezervationInfo.filter(x => !x.deleted);

        this.dataSource = new MatTableDataSource(this.rezervationNotDeleted);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      });


    });
  }


  edit(id: number, name: string, email: string, roomtype: string, checkin: Date, checkout: Date): void {
    this.id = id;
    this.reservation = <Reservation>{
      rezervationid: this.id,
      name: name,
      email: email,
      roomtype: roomtype,
      checkin: checkin,
      checkout: checkout
    };
    console.log(this.reservation);
    const dialogRef = this.dialog.open(EditRezervationComponent, {
      data: {
        rezervationId: id,
        name: name,
        email: email,
        roomType: roomtype,
        checkin: checkin,
        checkout: checkout



    }

    });
    dialogRef.afterClosed().subscribe(information => {

      this.dataSource = new MatTableDataSource(information);
    });


  }

  delete(rezervationid: number): void {
    this.id = rezervationid;
    const dialogRef = this.dialog.open(DeleteRezervationComponent, {
      data: {
        rezervationId: rezervationid,

      }

    });
    dialogRef.afterClosed().subscribe(information => {

      this.dataSource = new MatTableDataSource(information);
    });
  }


}

