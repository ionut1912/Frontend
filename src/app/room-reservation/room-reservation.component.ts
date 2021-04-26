import {FormControl} from '@angular/forms';


import {RoomService} from './../_services/RoomService.service';

import {ImageService} from './../_services/ImageService.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../clases/Room';
import {RoomImage} from "../clases/RoomImage";

import {ReviewDetails} from "../clases/ReviewDetails";
import {ReviewService} from './../_services/ReviewService.service';
import {TotalPrice} from "../clases/TotalPrice";
import {PriceService} from "../_services/PriceService.service";
import {ReservationService} from "../_services/ReservationService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {Reservations} from "../clases/Reservations";
import {UserService} from "../_services/UserService.service";
import {UserData} from "../clases/UserData";
import {RoomReservations} from "../clases/RoomReservations";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private roomService: RoomService, private imageService: ImageService, private  reviewService: ReviewService,private UserService:UserService, private  priceService: PriceService,private  reservationService:ReservationService,private  tokenStorageService:TokenStorageService) {
  }

  roomid!: number;
  rooms!: Room;
  checkin!: Date;
  checkout!: Date;
  noofrooms!: number;
  image!: RoomImage[];
  noofadults!: number;
  noofchildrens!: number;
  date1!: FormControl;
  date2!: FormControl;
  reviews!: ReviewDetails[];
  price!: TotalPrice;
userData!:UserData;
  form: any = {};
   reservations!: Reservations;
   roomreservation!:RoomReservations;

  ngOnInit(): void {

    this.roomid = this.route.snapshot.params['id'];
this.price=new TotalPrice();
    this.rooms = new Room();
    this.roomService.findAllById(this.roomid).subscribe(room => {
      this.rooms = room;

    });
    this.imageService.getRoomImageById(this.roomid).subscribe(roomimage => {
      this.image = roomimage;

    });

    this.priceService.getTotalPrice(this.getCheckin(),this.getCheckout(),this.roomid).subscribe(prices => {
      this.price = prices;

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


  hasChildrens(): boolean {
    if (this.noofchildrens <= 0)
      return false;
    return true;
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
onClick():void {
this.userData=new UserData();
  this.UserService.getUserData(this.tokenStorageService.getUsername()).subscribe(data => {
    this.userData = data;
    this.reservations = new Reservations(this.rooms.name, this.userData.email, this.rooms.roomtype, this.getCheckin(), this.getCheckout(), false, this.userData.userid);
    this.reservationService.saveReservation(this.reservations).subscribe(reservation => {
    });
this.roomreservation=new RoomReservations(this.rooms.roomid,this.price.id,this.reservations.reservationsId,this.getCheckin(),this.getCheckout(),this.getnoofroms(),this.getnoofadults(),this.getnoofchildrens());
this.reservationService.saveRoomReservation(this.roomreservation).subscribe(data=>{

})
  });

  }

  }











