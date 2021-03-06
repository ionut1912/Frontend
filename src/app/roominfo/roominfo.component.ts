import {ImageService} from './../_services/ImageService.service';
import {RoomDetails} from './../clases/RoomDetails';
import {RoomDetailsService} from './../_services/RoomDetailsService.service';
import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../clases/Room';
import {RoomService} from '../_services/RoomService.service';
import {RoomReservation} from '../clases/RoomReservation';
import {ReservationService} from '../_services/ReservationService.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MultipleReservationsHelper} from '../clases/MultipleReservationsHelper';
import {RoomImage} from '../clases/RoomImage';
import {MatDialog} from '@angular/material/dialog';
import {RoomReservationComponent} from '../room-reservation/room-reservation.component';


import {UserService} from "../_services/UserService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {UserData} from "../clases/UserData";



@Component({
  selector: 'app-roominfo',
  templateUrl: './roominfo.component.html',
  styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent implements OnInit {
  roomDetails: RoomDetails[] = [];
  rooms: Room[] = [];
  roomReservation: RoomReservation[] = [];
  roomInformation: RoomDetails[] = [];
  images:RoomImage[]=[];

  @Input() checkin!: Date;
  @Input() checkout!: Date;
  @Input() noofrooms!: number;
  @Input() noofadults!: number;
  @Input() noofchildrens!: number;
  nrofClicks: number = 0;
  roomDetail: RoomDetails = new RoomDetails();
  roomInfo: Room = new Room();
  ids!: number;
  display = false;
  user!:UserData;
roomsEmpty:boolean=false;
roomsInformationEmpty:boolean=false;
roomDetailEmpty:boolean=false;
  reservation: MultipleReservationsHelper = new MultipleReservationsHelper();
  reservations: MultipleReservationsHelper[] = [];


  constructor(private tokenStorage:TokenStorageService,private  userService: UserService,private  matDialog:MatDialog,private roomDetailsService: RoomDetailsService, private roomImageService: ImageService, private  roomService: RoomService, private  reservationService: ReservationService, public  snackBar: MatSnackBar) {

  }

  ngOnInit(): void {


    this.reservationService.getAll().subscribe(info => {
      this.roomReservation = info;
      this.roomDetailsService.getRoomInfo(this.checkin, this.checkout).subscribe(info => {
        this.roomDetails = info;


        if (this.roomDetails.length === 0 && this.roomReservation.length === 0) {
          this.roomService.findAll().subscribe(room => {
            this.rooms = room;

            for (let i = 0; i < this.rooms.length; i++) {
              this.roomImageService.getRoomImageById(this.rooms[i].roomid).subscribe(image => {

                this.rooms[i].roomImage = image;

              });
            }
if(room.length==0){
  this.roomsEmpty=true;
}
          });
        } else if (this.roomDetails.length === 0 && this.roomReservation.length > 0) {
          this.roomDetailsService.getRoomDetails().subscribe(roomDetailss => {
            this.roomInformation = roomDetailss;

            for (let i = 0; i < this.roomInformation.length; i++) {
              this.roomImageService.getRoomImageById(this.roomInformation[i].roomid).subscribe(image => {
                this.roomInformation[i].images = image;

              });
            }
if(this.roomInformation.length==0){
  this.roomsInformationEmpty=true;
}
          });
        } else if (this.roomDetails.length > 0) {

          for (let i = 0; i < this.roomDetails.length; i++) {
            this.roomImageService.getRoomImageById(this.roomDetails[i].roomid).subscribe(images => {
              this.roomDetails[i].images = images;
            });
          }
          this.roomDetailsService.getRoomDetails().subscribe(roomDetailss => {
            this.roomInformation = roomDetailss;

            for (let i = 0; i < this.roomInformation.length; i++) {
              this.roomImageService.getRoomImageById(this.roomInformation[i].roomid).subscribe(image => {
                this.roomInformation[i].images = image;
              });
            }
            for (let i = 0; i < this.roomInformation.length; i++) {
              this.roomDetails.push(this.roomInformation[i]);

            }

          });
          if(this.roomDetails.length==0){
            this.roomDetailEmpty=true;
          }
        }

      });
    });

if(this.roomsEmpty&&this.roomsInformationEmpty&&this.roomDetailEmpty){
this.snackBar.open("Nu exista camere disponibile in perioada " + this.checkin + this.checkout);
}
  }
  reserveRoom(id: number) {
    this.nrofClicks++;

    if(this.nrofClicks<=this.noofrooms){
      this.reservationService.getAll().subscribe(info => {
        this.roomReservation = info;
        this.roomDetailsService.getRoomInfo(this.checkin, this.checkout).subscribe(info => {
          this.roomDetails = info;


          if (this.roomDetails.length === 0 && this.roomReservation.length === 0) {
            this.roomService.findAll().subscribe(room => {
              this.rooms = room;

              for (let i = 0; i < this.rooms.length; i++) {
                this.roomImageService.getRoomImageById(this.rooms[i].roomid).subscribe(image => {

                  this.rooms[i].roomImage = image;

                });
              }
              this.roomInfo = this.rooms.filter(x => x.roomid == id)[0];

              this.ids = this.rooms.indexOf(this.roomInfo);

              this.reservation = <MultipleReservationsHelper> {
                roomid: id,
                name: this.rooms[this.ids].name,
                roomtype: this.rooms[this.ids].roomtype,
                roomdetails: this.rooms[this.ids].roomdetails,
                roomprice: this.rooms[this.ids].roomprice,
                pricecurency: this.rooms[this.ids].pricecurency,

                checkin: this.checkin,
                checkout: this.checkout,
                noofrooms: this.noofrooms,
                noofadults: this.noofadults,
                noofchildrens: this.noofchildrens
              };
              this.reservations.push(this.reservation);

            });
          } else if (this.roomDetails.length === 0 && this.roomReservation.length > 0) {
            this.roomDetailsService.getRoomDetails().subscribe(roomDetailss => {
              this.roomInformation = roomDetailss;

              for (let i = 0; i < this.roomInformation.length; i++) {
                this.roomImageService.getRoomImageById(this.roomInformation[i].roomid).subscribe(image => {
                  this.roomInformation[i].images = image;

                });

              }
              this.roomDetail = this.roomInformation.filter(x => x.roomid == id)[0];

              this.ids = this.roomInformation.indexOf(this.roomDetail);

              this.reservation = <MultipleReservationsHelper> {
                roomid: id,
                name: this.roomInformation[this.ids].name,
                roomtype: this.roomInformation[this.ids].roomtype,
                roomdetails: this.roomInformation[this.ids].roomdetails,
                roomprice: this.roomInformation[this.ids].roomprice,
                pricecurency: this.roomInformation[this.ids].pricecurency,

                checkin: this.checkin,
                checkout: this.checkout,
                noofrooms: this.noofrooms,
                noofadults: this.noofadults,
                noofchildrens: this.noofchildrens
              };
              this.reservations.push(this.reservation);

            });
          } else if (this.roomDetails.length > 0) {

            for (let i = 0; i < this.roomDetails.length; i++) {
              this.roomImageService.getRoomImageById(this.roomDetails[i].roomid).subscribe(images => {
                this.roomDetails[i].images = images;
              });
            }

            this.roomDetailsService.getRoomDetails().subscribe(roomDetailss => {
              this.roomInformation = roomDetailss;

              for (let i = 0; i < this.roomInformation.length; i++) {
                this.roomImageService.getRoomImageById(this.roomInformation[i].roomid).subscribe(image => {
                  this.roomInformation[i].images = image;
                });
              }
              for (let i = 0; i < this.roomInformation.length; i++) {
                this.roomDetails.push(this.roomInformation[i]);

              }

              this.roomDetail = this.roomDetails.filter(x => x.roomid == id)[0];

              this.ids = this.roomDetails.indexOf(this.roomDetail);





              this.reservation = <MultipleReservationsHelper> {
                roomid: id,

                name: this.roomDetails[this.ids].name,
                roomtype: this.roomDetails[this.ids].roomtype,
                roomdetails: this.roomDetails[this.ids].roomdetails,
                roomprice: this.roomDetails[this.ids].roomprice,
                pricecurency: this.roomDetails[this.ids].pricecurency,

                checkin: this.checkin,
                checkout: this.checkout,
                noofrooms: this.noofrooms,
                noofadults: this.noofadults,
                noofchildrens: this.noofchildrens
              };

              this.reservations.push(this.reservation);




            });

          }

        });
      });

    }



    if (this.nrofClicks > this.noofrooms) {
      this.snackBar.open('Ati rezervat deja numarul de camere selectat', 'Inchide', {
        duration: 3000
      });
    }
  }






  finishreservation(): void {

    this.matDialog.open(RoomReservationComponent,{

      data:
        {
          reservation: this.reservations
        },
      height: '800px',
      width: '800px'
    });
  }
}
