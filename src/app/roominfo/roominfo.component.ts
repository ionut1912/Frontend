
import { ImageService } from './../_services/ImageService.service';
import { RoomDetails } from './../clases/RoomDetails';
import { RoomDetailsService } from './../_services/RoomDetailsService.service';
import { Component, Input, OnInit } from '@angular/core';
import {Room} from "../clases/Room";
import {RoomService} from "../_services/RoomService.service";


@Component({
    selector: 'app-roominfo',
    templateUrl: './roominfo.component.html',
    styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent implements OnInit {
  roomDetails :RoomDetails[]=[];
rooms:Room[]=[];


    @Input() checkin!: Date;
    @Input() checkout!: Date;

    constructor(private roomDetailsService: RoomDetailsService, private roomImageService: ImageService ,private  roomService:RoomService) {

    }

    ngOnInit(): void {


        this.roomDetailsService.getRoomInfo(this.checkin, this.checkout).subscribe(info => {
            this.roomDetails = info;

      if(this.roomDetails.length===0){
        this.roomService.findAll().subscribe(room=>{
          this.rooms=room;
          for(let i=0;i<this.rooms.length;i++)
            this.roomImageService.getRoomImageById(this.rooms[i].roomid).subscribe(image=>{

              this.rooms[i].roomImage=image;
            });
        });
      }
      else {
        for (let i = 0; i < this.roomDetails.length; i++) {
          this.roomImageService.getRoomImageById(this.roomDetails[i].roomid).subscribe(image => {

            this.roomDetails[i].images = image;

          });
        }
      }
        });


    }

}
