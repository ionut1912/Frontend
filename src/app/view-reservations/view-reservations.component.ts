import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from '../_services/ReservationService.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserService} from '../_services/UserService.service';
import {UserData} from '../clases/UserData';
import {Reservation} from '../clases/Reservation';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {EditRezervationComponent} from '../edit-rezervation/edit-rezervation.component';
import {DeleteRezervationComponent} from '../delete-rezervation/delete-rezervation.component';
import {UserReservationHelper} from "../clases/UserReservationHelper";
import {MatSnackBar} from "@angular/material/snack-bar";


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
  reservationInfo: UserReservationHelper[] = [];
  reservation: Reservation = new Reservation();
  date1: FormControl[] = [];
  date2: FormControl[] = [];
  reservationInfoByReservationId: UserReservationHelper[] = [];
  reservationInfoByRoomId: UserReservationHelper[] = [];
  reservationInfoByName: UserReservationHelper[] = [];
  reservationInfoByEmail: UserReservationHelper[] = [];
  reservationInfoByRoomType: UserReservationHelper[] = [];

  constructor(private matSnackBar: MatSnackBar, private  formbuilder: FormBuilder, private  reservationService: ReservationService, private  tokenStorage: TokenStorageService, private  userService: UserService, public  dialog: MatDialog) {
    this.search = this.formbuilder.group({
      reservationid: [''],
      roomid: [''],
      name: [''],
      email: [''],
      roomtype: [''],
      checkin: [''],
      checkout: ['']
    });

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id!: number;
  reservationNotDeleted: UserReservationHelper[] = [];
  search!: FormGroup;
  public dataSource = new MatTableDataSource<UserReservationHelper>();
  form: any = {
    reservationid: null,
    roomid: null,
    name: null,
    email: null,
    roomtype: null,
    checkin: null,
    checkout: null
  };

  ngOnInit(): void {
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInfo => {
      this.userDetails = userInfo;

      this.reservationService.getRezervationByUserId(this.userDetails.userid).subscribe(rezervation => {
        this.reservationInfo = rezervation;
        this.reservationNotDeleted = this.reservationInfo.filter(x => !x.deleted);

        this.dataSource = new MatTableDataSource(this.reservationNotDeleted);
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


  searchByReservationId() {
    this.reservationInfoByReservationId = this.reservationInfo.filter(x => x.reservationid == this.form.reservationid);
    if (this.reservationInfoByReservationId.length === 0) {
      this.matSnackBar.open("Rezervarea cu id-ul " + `${this.form.reservationid}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Rezervarea cu id-ul " + `${this.form.reservationid}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationInfoByReservationId);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  searchByRoomId() {
    if (this.reservationInfoByReservationId.length > 0) {
      this.reservationInfoByRoomId = this.reservationInfoByReservationId.filter(x => x.roomid == this.form.roomid);
    } else {
      this.reservationInfoByRoomId = this.reservationInfo.filter(x => x.roomid == this.form.roomid);
    }
    if (this.reservationInfoByRoomId.length === 0) {
      this.matSnackBar.open("Camera cu id-ul " + `${this.form.roomid}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Camera cu id-ul " + `${this.form.roomid}` + " a fost gasita", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationInfoByRoomId);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  searchByName() {
    if (this.reservationInfoByReservationId.length > 0 ) {
      this.reservationInfoByName = this.reservationInfoByReservationId.filter(x => x.name == this.form.name);
    }
    else if(this.reservationInfoByRoomId.length>0){
      this.reservationInfoByName = this.reservationInfoByRoomId.filter(x => x.name == this.form.name);
    }
    else {
      this.reservationInfoByName = this.reservationInfo.filter(x => x.name == this.form.name);
    }
    if (this.reservationInfoByName.length === 0) {
      this.matSnackBar.open("Rezervarea pe  numele " + `${this.form.name}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Rezervarea pe  numele " + `${this.form.name}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationInfoByName);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  searchByEmail() {
    if (this.reservationInfoByReservationId.length > 0 ) {
      this.reservationInfoByEmail = this.reservationInfoByReservationId.filter(x => x.email == this.form.email);
    }
    else if(this.reservationInfoByRoomId.length>0){
      this.reservationInfoByEmail = this.reservationInfoByRoomId.filter(x => x.email == this.form.email);
    }
else if(this.reservationInfoByName.length>0){
  this.reservationInfoByEmail=this.reservationInfoByName.filter(x=>x.email==this.form.email);
    }
else {
  this.reservationInfoByEmail=this.reservationInfo.filter(x=>x.email==this.form.email)
    }
if(this.reservationInfoByEmail.length===0)
{

  this.matSnackBar.open("Rezervarea cu  email-ul " + `${this.form.email}` + " nu exista", "Inchide", {
    duration: 3000
  });
}
else {
  this.matSnackBar.open("Rezervarea cu   emailul " + `${this.form.email}` + " a fost gasita ", "Inchide", {
    duration: 3000
  });
  this.dataSource = new MatTableDataSource(this.reservationInfoByEmail);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  }

  searchByRoomType() {
    if (this.reservationInfoByReservationId.length > 0 ) {
      this.reservationInfoByRoomType = this.reservationInfoByReservationId.filter(x => x.roomtype == this.form.roomtype);
    }
    else if(this.reservationInfoByRoomId.length>0){
      this.reservationInfoByRoomType = this.reservationInfoByRoomId.filter(x => x.roomtype == this.form.roomtype);
    }
    else if(this.reservationInfoByName.length>0){
      this.reservationInfoByRoomType=this.reservationInfoByName.filter(x=>x.roomtype==this.form.roomtype);
    }
    else if(this.reservationInfoByEmail.length>0){
      this.reservationInfoByRoomType=this.reservationInfoByEmail.filter(x=>x.roomtype==this.form.roomtype);
    }
    else
    {
      this.reservationInfoByRoomType=this.reservationInfo.filter(x=>x.roomtype==this.form.roomtype);
    }
    if(this.reservationInfoByRoomType.length===0)
    {

      this.matSnackBar.open("Rezervarea cu  tipul camerei " + `${this.form.roomtype}` + " nu exista", "Inchide", {
        duration: 3000
      });
    }
    else {
      this.matSnackBar.open("Rezervarea cu  tipul camerei  " + `${this.form.roomtype}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationInfoByRoomType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }


}
