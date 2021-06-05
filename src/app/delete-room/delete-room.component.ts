import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomService} from '../_services/RoomService.service';
import { ViewRoomsComponent} from '../view-rooms/view-rooms.component';

import {MatSnackBar} from "@angular/material/snack-bar";
export interface DeleteRoomInterface {
  roomid: number,
}
@Component({
  selector: 'delete-room',
  templateUrl: 'delete-room.component.html',
})
export class DeleteRoom {
  constructor(private  matSnackbar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: DeleteRoomInterface, public dialogRef: MatDialogRef<ViewRoomsComponent>, public  dialog: MatDialog, public  roomService: RoomService) {

  }

  da() {
    this.deleteRoom();
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.data.roomid);
    this.dialogRef.close();
    this.matSnackbar.open('Camera a fost stearsa cu succes','Inchide',{
      duration: 3000
    });
  }

  nu() {
    this.dialogRef.close();
  }
}
