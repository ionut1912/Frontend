import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from '../_services/ReservationService.service';
import {Reservation} from '../clases/Reservation';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-all-reservations',
  templateUrl: './view-all-reservations.component.html',
  styleUrls: ['./view-all-reservations.component.css']
})
export class ViewAllReservationsComponent implements OnInit {
  constructor(public  matSnackBar:MatSnackBar,public  reservationService:ReservationService,public formBuilder:FormBuilder) {
    this.search = this.formBuilder.group({
      reservationid: [''],
      roomid: [''],
      name: [''],
      email: [''],
      roomtype: [''],
      checkin: [''],
      checkout: ['']
    });

  }
  columns: string[] = ['reservationid','name', 'email', 'roomtype', 'checkin', 'checkout'];
reservation:Reservation[]=[];
  reservationByReservationId:Reservation[]=[];
  reservationByName:Reservation[]=[];
  reservationByEmail:Reservation[]=[];
  reservationByRoomType:Reservation[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource=new MatTableDataSource<Reservation>();
  search!: FormGroup;
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
this.reservationService.getRezervation().subscribe(data=>{
this.reservation=data;
this.dataSource=new MatTableDataSource(this.reservation);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
});
  }
  searchByReservationId() {
    this.reservationByReservationId = this.reservation.filter(x => x.rezervationid == this.form.reservationid);
    if (this.reservationByReservationId.length === 0) {
      this.matSnackBar.open("Rezervarea cu id-ul " + `${this.form.reservationid}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Rezervarea cu id-ul " + `${this.form.reservationid}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationByReservationId);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }


  searchByName() {
    if (this.reservationByReservationId.length > 0 ) {
      this.reservationByName = this.reservationByReservationId.filter(x => x.name == this.form.name);
    }

    else {
      this.reservationByName = this.reservation.filter(x => x.name == this.form.name);
    }
    if (this.reservationByName.length === 0) {
      this.matSnackBar.open("Rezervarea pe  numele " + `${this.form.name}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Rezervarea pe  numele " + `${this.form.name}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationByName);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  searchByEmail() {
    if (this.reservationByReservationId.length > 0 ) {
      this.reservationByEmail = this.reservationByReservationId.filter(x => x.email == this.form.email);
    }

    else if(this.reservationByName.length>0){
      this.reservationByEmail=this.reservationByName.filter(x=>x.email==this.form.email);
    }
    else {
      this.reservationByEmail=this.reservation.filter(x=>x.email==this.form.email)
    }
    if(this.reservationByEmail.length===0)
    {

      this.matSnackBar.open("Rezervarea cu  email-ul " + `${this.form.email}` + " nu exista", "Inchide", {
        duration: 3000
      });
    }
    else {
      this.matSnackBar.open("Rezervarea cu   emailul " + `${this.form.email}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationByEmail);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

  searchByRoomType() {
    if (this.reservationByReservationId.length > 0 ) {
      this.reservationByRoomType = this.reservationByReservationId.filter(x => x.roomtype == this.form.roomtype);
    }

    else if(this.reservationByName.length>0){
      this.reservationByRoomType=this.reservationByName.filter(x=>x.roomtype==this.form.roomtype);
    }
    else if(this.reservationByEmail.length>0){
      this.reservationByRoomType=this.reservationByEmail.filter(x=>x.roomtype==this.form.roomtype);
    }
    else
    {
      this.reservationByRoomType=this.reservation.filter(x=>x.roomtype==this.form.roomtype);
    }
    if(this.reservationByRoomType.length===0)
    {

      this.matSnackBar.open("Rezervarea cu  tipul camerei " + `${this.form.roomtype}` + " nu exista", "Inchide", {
        duration: 3000
      });
    }
    else {
      this.matSnackBar.open("Rezervarea cu  tipul camerei  " + `${this.form.roomtype}` + " a fost gasita ", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.reservationByRoomType);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }

}
