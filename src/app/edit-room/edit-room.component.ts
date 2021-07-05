import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomService} from '../_services/RoomService.service';
import {Room} from '../clases/Room';
import {ViewRoomsComponent} from '../view-rooms/view-rooms.component';

import {MatSnackBar} from '@angular/material/snack-bar';

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
  styleUrls: ['edit-room.component.css']
})
export class EditRoom {
  rooms!: FormGroup;
  formErors: any;
  pattern = '[a-zA-Z ]*';
  constructor(public dialogRef2: MatDialogRef<EditRoom>, private matSnackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: EditRoomInterface, public dialogRef: MatDialogRef<ViewRoomsComponent>, public  dialog: MatDialog, private builder: FormBuilder, public  roomService: RoomService) {

    this.rooms = this.builder.group({
      name: ['', Validators.required],
      roomtype: ['', Validators.required],
      roomdetails: ['', Validators.required],
      roomprice: ['', [Validators.required, Validators.pattern(this.pattern)]],
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


    });
    this.dialogRef.close();
    this.matSnackBar.open('Camera a fost modificata cu succes','Inchide',{
      duration: 3000
    });


  }

  close() {
    this.dialogRef2.close();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.rooms.controls[controlName].hasError(errorName);
  };
}
