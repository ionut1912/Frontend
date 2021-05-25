import {FormControl} from '@angular/forms';


import {RoomService} from './../_services/RoomService.service';

import {ImageService} from './../_services/ImageService.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../clases/Room';
import {RoomImage} from "../clases/RoomImage";

import {ReviewDetails} from "../clases/ReviewDetails";
import {ReviewService} from './../_services/ReviewService.service';


import {ReservationService} from "../_services/ReservationService.service";
import {TokenStorageService} from "../_services/token-storage.service";

import {UserService} from "../_services/UserService.service";
import {UserData} from "../clases/UserData";
import {ReservationsHelper} from "../clases/ReservationsHelper";
import {TotalPrice} from '../clases/TotalPrice';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';


@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private roomService: RoomService, private imageService: ImageService, private  reviewService: ReviewService, private userService: UserService, private  reservationService: ReservationService, private  tokenStorageService: TokenStorageService,public  matDialog:MatDialog) {
  }

  roomid!: number;
  rooms: Room = new Room();
  checkin!: Date;
  checkout!: Date;
  noofrooms!: number;
  image!: RoomImage[];
  noofadults!: number;
  noofchildrens!: number;
  date1!: FormControl;
  date2!: FormControl;
  reviews!: ReviewDetails[];
price:TotalPrice=new TotalPrice();
  userData!: UserData;
  reservations!: ReservationsHelper;
  form: any = {};


  ngOnInit(): void {

    this.roomid = this.route.snapshot.params['id'];
    this.roomService.getPrice(this.getCheckin(),this.getCheckout(),this.roomid).subscribe(price=>{
      this.price=price;
    });

    this.roomService.findAllById(this.roomid).subscribe(room => {
      this.rooms = room;
      this.userData = new UserData();

      this.userService.getUserData(this.tokenStorageService.getUsername()).subscribe(data => {
        this.userData = data;

          this.reservations = <ReservationsHelper> {
            name: this.userData.name,
            email: this.userData.email,
            roomtype: this.rooms.roomtype,
            checkin: this.getCheckin(),
            checkout: this.getCheckout(),
            deleted: false,
            userid: this.userData.userid,
            roomid: this.roomid,

            noofrooms: this.getnoofroms(),
            noofadults: this.getnoofadults(),
            noofchildrens: this.getnoofchildrens()
          }

        });
      });

    this.imageService.getRoomImageById(this.roomid).subscribe(roomimage => {
      this.image = roomimage;

    });


    this.reviewService.getReviews(this.roomid).subscribe(review => {
      this.reviews = review;
    });
    this.date1 = new FormControl(new Date(this.getCheckin()));
    this.date2 = new FormControl(new Date(this.getCheckout()));
    this.noofrooms = this.getnoofroms();
    this.noofadults = this.getnoofadults();
    this.noofchildrens = this.getnoofchildrens();


  }



  getCheckin(): Date {
    this.checkin = JSON.parse(localStorage.getItem("checkin") || '{}');
    return this.checkin;
  }

  getCheckout(): Date {
    this.checkout = JSON.parse(localStorage.getItem("checkout") || '{}');
    return this.checkout;
  }

  getnoofroms(): number {
    this.noofrooms = JSON.parse(localStorage.getItem("noofrooms") || '{}');
    return this.noofrooms;
  }

  getnoofadults(): number {
    this.noofadults = JSON.parse(localStorage.getItem("noofadults") || '{}');
    return this.noofadults;
  }

  getnoofchildrens(): number {
    this.noofchildrens = JSON.parse(localStorage.getItem("noofchildrens") || '{}');
    return this.noofchildrens;
  }

  onClick(): void {
    this.saveRezervation();



  }

  saveRezervation(): void {


    this.reservationService.saveReservation(this.reservations);

      const ref = this.matDialog.open(DialogDataExampleDialog, {
        data: {
          text: 'Rezervarea',
          text2: 'adaugata',
          text3: 'a'
        }
      });


  }
}










