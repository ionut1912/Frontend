

import {RoomService} from './../_services/RoomService.service';

import {ImageService} from './../_services/ImageService.service';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../clases/Room';
import {RoomImage} from '../clases/RoomImage';

import {ReviewDetails} from '../clases/ReviewDetails';
import {ReviewService} from './../_services/ReviewService.service';


import {ReservationService} from '../_services/ReservationService.service';
import {TokenStorageService} from '../_services/token-storage.service';

import {UserService} from '../_services/UserService.service';
import {UserData} from '../clases/UserData';
import {ReservationsHelper} from '../clases/ReservationsHelper';
import {TotalPrice} from '../clases/TotalPrice';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

import {MultipleReservationsHelper} from '../clases/MultipleReservationsHelper';
import {MatSnackBar} from "@angular/material/snack-bar";



export interface ReservationData {
  reservation: MultipleReservationsHelper[];
}

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ReservationData, private route: ActivatedRoute, private roomService: RoomService, private imageService: ImageService, private  reviewService: ReviewService, private userService: UserService, private  reservationService: ReservationService, private  tokenStorageService: TokenStorageService, public  matSnackBar:MatSnackBar) {
  }

  roomid!: number;
  rooms: Room = new Room();
  checkin!: Date;
  checkout!: Date;
  noofrooms!: number;
  image!: RoomImage[];
  noofadults!: number;
  noofchildrens!: number;

  reviews!: ReviewDetails[];
  finalprice: number = 0;
  price: TotalPrice = new TotalPrice();
  userData: UserData = new UserData();
  reservations!: ReservationsHelper;
  form: any = {};


  ngOnInit(): void {

console.log(this.data.reservation.length);
    for (let i = 0; i < this.data.reservation.length; i++) {
      this.reviews = [];
      this.reviewService.getReviews(this.data.reservation[i].roomid).subscribe(reviewsInformation => {
       for(let i=0;i<reviewsInformation.length;i++)
       {
         this.reviews.push(reviewsInformation[i]);
       }

        console.log(this.reviews);

      });

       this.roomService.getPrice(this.data.reservation[0].checkin, this.data.reservation[0].checkout, this.data.reservation[i].roomid).subscribe(priceInfo => {
        this.price = priceInfo;
        this.finalprice += this.price.finalprice;

      });
    }



    this.userService.getUserData(this.tokenStorageService.getUsername()).subscribe(userInfo => {
      this.userData = userInfo;

    });
  }


  onClick(): void {
    console.log(this.userData.username);
    for (let i = 0; i < this.data.reservation.length; i++) {
      this.reservations = <ReservationsHelper>{
        name: this.userData.name,
        email: this.userData.email,
        roomtype: this.data.reservation[i].roomtype,
        checkin: this.data.reservation[i].checkin,
        checkout: this.data.reservation[i].checkout,
        deleted: false,
        userid: this.userData.userid,
        roomid: this.data.reservation[i].roomid,
        noofrooms: this.data.reservation[i].noofrooms,
        noofadults: this.data.reservation[i].noofadults,
        noofchildrens: this.data.reservation[i].noofchildrens

      };
      this.reservationService.saveReservation(this.reservations);
    }
    this.matSnackBar.open('Rezervarea a fost creata cu succes','Inchide',{
      duration:3000
    });


  }

}










