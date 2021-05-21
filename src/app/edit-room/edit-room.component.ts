import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomService} from '../_services/RoomService.service';
import {Room} from '../clases/Room';
import {ViewRoomsComponent} from '../view-rooms/view-rooms.component';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
export interface EditRoomInterface {
  roomid: number,
  name: string,
  roomtype: string,
  roomdetails: string,
  roomprice: number,
  pricecurency: string
}
@Component({
  selector: 'edit-room',
  templateUrl: 'edit-room.component.html',
})
export class EditRoom {
  rooms!: FormGroup;
  formErors: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditRoomInterface, public dialogRef: MatDialogRef<ViewRoomsComponent>, public  dialog: MatDialog, private builder: FormBuilder, public  roomService: RoomService) {

    this.rooms = this.builder.group({
      name: ['', Validators.required],
      roomtype: ['', Validators.required],
      roomdetails: ['', Validators.required],
      roomprice: ['', Validators.required],
      pricecurency: ['', Validators.required],
    });

    this.formErors = {
      name: {},
      roomtype: {},

      roomdetails: {},

      roomprice: {},
      pricecurency: {}
    };

  }

  onSubmit() {
    this.editRoom();
  }

  editRoom(): void {
    this.roomService.updateRoom(this.data.roomid, <Room> {
      name: this.data.name,
      roomtype: this.data.roomtype,
      roomdetails: this.data.roomdetails,
      roomprice: this.data.roomprice,
      pricecurency: this.data.pricecurency
    }).subscribe(() => {
      this.dialogRef.close();
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          text: 'Camera',
          text2: 'modificata',
          text3: 'a'

        }
      });
    });

  }



}
