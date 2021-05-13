import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../_services/ReservationService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {UserService} from "../_services/UserService.service";
import {UserData} from "../clases/UserData";
import {Reservation} from "../clases/Reservation";

import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit,AfterViewInit {
  userDetails: UserData = new UserData();
  columns: string[] = ['reservationid','name', 'email', 'roomtype', 'checkin', 'checkout', 'action'];
  rezervationInfo: Reservation[] = [];
date1:FormControl[]=[];
date2:FormControl[]=[];
  constructor(private  reservationService: ReservationService, private  tokenStorage: TokenStorageService, private  userService: UserService) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id!: number;
  hidden: boolean = false;
  public dataSource=new MatTableDataSource<Reservation>();

ngOnInit(): void {
}

  ngAfterViewInit() {
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInfo => {
      this.userDetails = userInfo;

      this.reservationService.getRezervationByUserId(this.userDetails.userid).subscribe(rezervation => {

        this.dataSource = new MatTableDataSource(rezervation);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });


    });
  }




  edit(id: number): void {
    this.id = id;
    console.log(this.id);
    if (!this.hidden)
      this.hidden = true;

    else
      this.hidden = false;



  }
  delete(id:number):void{
    this.id=id;

  }
  onSubmit():void{

  }
}
