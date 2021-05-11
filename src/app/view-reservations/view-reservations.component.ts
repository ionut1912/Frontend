import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../_services/ReservationService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {UserService} from "../_services/UserService.service";
import {UserData} from "../clases/UserData";
import {Reservation} from "../clases/Reservation";

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit {
userDetails:UserData=new UserData();
  columns: string[] =['name', 'email', 'roomtype','checkin','checkout','action'];
rezervationInfo:Reservation[]=[];
  constructor(private  reservationService:ReservationService,private  tokenStorage:TokenStorageService,private  userService:UserService) { }

  ngOnInit(): void {
    this.getReservationByUserid();
  }
getReservationByUserid(){
  this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInfo=>{
    this.userDetails=userInfo;

    this.reservationService.getRezervationByUserId(this.userDetails.userid).subscribe(rezervation=>{
     this.rezervationInfo=rezervation;

    });
  });
}
}
