import { RoomService } from './../_services/RoomService.service';
import { RoomImage } from './../clases/RoomImage';
import { ImageService } from './../_services/ImageService.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../clases/Room';


@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private ImageService:ImageService,private roomService:RoomService) { }
  roomid!: number;
  rooms!: Room;
  roomimage!: RoomImage[];
  ngOnInit(): void {

    this.roomid = this.route.snapshot.params['id'];
    this.ImageService.getRoomImageById(this.roomid).subscribe(image=>{
this.roomimage=image;
    });
    
    this.roomService.findAllById(this.roomid).subscribe(room=>{
      this.rooms=room;
    })

  }


}
