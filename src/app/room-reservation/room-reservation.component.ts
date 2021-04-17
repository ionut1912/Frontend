import { FormControl } from '@angular/forms';


import { RoomService } from './../_services/RoomService.service';

import { ImageService } from './../_services/ImageService.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../clases/Room';
import {RoomImage} from "../clases/RoomImage";
import {templateJitUrl} from "@angular/compiler";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private roomService:RoomService,private imageService:ImageService) { }

  roomid!: number;
  rooms!: Room;
  checkin!: Date;
  checkout!: Date;
  noofrooms!:number;
  image!: RoomImage[];
  noofadults!:number;
  noofchildrens!:number;
  date1!: FormControl;
  date2!: FormControl;

x!:number[];
form:any={

};

 ngOnInit():void{

    this.roomid = this.route.snapshot.params['id'];

    this.rooms=new Room();
    this.roomService.findAllById(this.roomid).subscribe(room=>{
      this.rooms=room;
    });
this.imageService.getRoomImageById(this.roomid).subscribe(roomimage=>{
  this.image=roomimage;

})
this.date1=new FormControl(new Date(this.getCheckin()));
this.date2=new FormControl(new Date(this.getCheckout()));
this.noofrooms=this.getnoofroms();
this.noofadults=this.getnoofadults();
this.noofchildrens=this.getnoofchildrens();
this.x=[];
this.x.length=this.noofchildrens;



}



hasChildrens():boolean{
   if(this.noofchildrens<=0)
     return false;
  return true;
}

 getCheckin():Date{
  this.checkin=JSON.parse(localStorage.getItem("checkin")||'{}');
  return this.checkin;
}
getCheckout():Date{
  this.checkout=JSON.parse(localStorage.getItem("checkout")||'{}');
  return this.checkout;
}
getnoofroms():number{
  this.noofrooms=JSON.parse(localStorage.getItem("noofrooms")||'{}');
return this.noofrooms;
}
getnoofadults():number{
  this.noofadults=JSON.parse(localStorage.getItem("noofadults")||'{}');
  return this.noofadults;
}
getnoofchildrens():number{
  this.noofchildrens=JSON.parse(localStorage.getItem("noofchildrens")||'{}');
  return this.noofchildrens;
}



}




