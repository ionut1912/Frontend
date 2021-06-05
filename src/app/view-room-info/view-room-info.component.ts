import {Component, Inject, OnInit} from '@angular/core';
import {RoomImage} from "../clases/RoomImage";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReservationData} from "../room-reservation/room-reservation.component";
import {RoomsViewed} from "../clases/RoomsViewed";
import {RoomService} from "../_services/RoomService.service";
import {NrOfViewsHelper} from "../clases/NrOfViewsHelper";
export  interface  Roomdata {
  roomid: number,
  roomname:string,
  roomdetails:string,
  roomtype:string,
  images:RoomImage[],

}
@Component({
  selector: 'app-view-room-info',
  templateUrl: './view-room-info.component.html',
  styleUrls: ['./view-room-info.component.css']
})
export class ViewRoomInfoComponent implements OnInit {
roomsViewed:NrOfViewsHelper=new NrOfViewsHelper();
  constructor(@Inject(MAT_DIALOG_DATA) public data:Roomdata ,public  dialogRef:MatDialogRef<ViewRoomInfoComponent>,private  roomService:RoomService) { }

  ngOnInit(): void {
    this.roomService.getNrOfViewsById(this.data.roomid).subscribe(viewsData=>{
      this.roomsViewed=viewsData;
    });
    console.log(this.roomsViewed);
  }
close():void
{
  this.dialogRef.close();
}
}
