


import { ImageService } from './../_services/ImageService.service';
import { RoomDetails } from './../clases/RoomDetails';
import { RoomDetailsService } from './../_services/RoomDetailsService.service';
import { Component, Input, OnInit } from '@angular/core';
import {Room} from "../clases/Room";
import {RoomService} from "../_services/RoomService.service";
import {RoomReservation} from '../clases/RoomReservation';
import {ReservationService} from '../_services/ReservationService.service';


@Component({
  selector: 'app-roominfo',
  templateUrl: './roominfo.component.html',
  styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent implements OnInit {
  roomDetails :RoomDetails[]=[];
  rooms:Room[]=[];
roomReservation:RoomReservation[]=[];
roomInformation:RoomDetails[]=[];

  @Input() checkin!: Date;
  @Input() checkout!: Date;

  constructor(private roomDetailsService: RoomDetailsService, private roomImageService: ImageService ,private  roomService:RoomService,private  reservationService:ReservationService) {

  }

  ngOnInit(): void {

this.reservationService.getAll().subscribe(info=>{
  this.roomReservation=info;
  this.roomDetailsService.getRoomInfo(this.checkin, this.checkout).subscribe(info => {
    this.roomDetails = info;

    if (this.roomDetails.length === 0 && this.roomReservation.length === 0) {
      this.roomService.findAll().subscribe(room => {
        this.rooms = room;

        for (let i = 0; i < this.rooms.length; i++)
          this.roomImageService.getRoomImageById(this.rooms[i].roomid).subscribe(image => {

            this.rooms[i].roomImage = image;
          });
      });
    }
    else if (this.roomDetails.length === 0 && this.roomReservation.length > 0)
    {
      this.roomDetailsService.getRoomDetails().subscribe(roomDetails=>{
            this.roomInformation=roomDetails;

            for(let i=0;i<this.roomInformation.length;i++){
              this.roomImageService.getRoomImageById(this.roomInformation[i].roomid).subscribe(image=>{
                this.roomInformation[i].images=image;
              });
            }

      });
    }
    else if(this.roomDetails.length>0) {
for(let i=0;i<this.roomDetails.length;i++)
{
  this.roomImageService.getRoomImageById(this.roomDetails[i].roomid).subscribe(images=>{
    this.roomDetails[i].images=images;
  });

}
      this.roomDetailsService.getRoomDetails().subscribe(roomDetails=>{
        this.roomInformation=roomDetails;

        for(let i=0;i<this.roomInformation.length;i++){
          this.roomImageService.getRoomImageById(this.roomInformation[i].roomid).subscribe(image=>{
            this.roomInformation[i].images=image;
          });
        }
        for(let i=0;i<this.roomInformation.length;i++){
          this.roomDetails.push(this.roomInformation[i]);
        }

      });

    }

  });

});


  }

}
