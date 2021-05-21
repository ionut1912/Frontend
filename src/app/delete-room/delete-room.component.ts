import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomService} from '../_services/RoomService.service';
import {DeleteRoomInterface, ViewRoomsComponent} from '../view-rooms/view-rooms.component';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';

@Component({
  selector: 'delete-room',
  templateUrl: 'delete-room.component.html',
})
export class DeleteRoom {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteRoomInterface, public dialogRef: MatDialogRef<ViewRoomsComponent>, public  dialog: MatDialog, public  roomService: RoomService) {

  }

  da() {
    this.deleteRoom();
  }

  deleteRoom() {
    this.roomService.deleteRoom(this.data.roomid);
    this.dialogRef.close();
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        text: 'Camera',
        text2: 'stearsa',
        text3: 'a'

      }
    });
  }

  nu() {
    this.dialogRef.close();
  }
}
