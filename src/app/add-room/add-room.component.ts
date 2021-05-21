import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Room} from '../clases/Room';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomService} from '../_services/RoomService.service';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {ViewRoomsComponent} from '../view-rooms/view-rooms.component';

@Component({
  selector: 'add-room',
  templateUrl: 'add-room.component.html',
})
export class AddRoom {
  rooms!: FormGroup;
  formErors: any;
  form: any = {
    name: null,
    roomtype: null,
    roomdetails: null,
    roomprice: null,
    pricecurency: null
  };
  text!: string;
  room: Room = new Room();

  selectedFiles!: FileList;
  imagesrc: string[] = [];

  constructor(private builder: FormBuilder, public dialogRef: MatDialogRef<ViewRoomsComponent>, public  dialog: MatDialog, public  roomService: RoomService) {
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
    this.saveRoom();

  }

  saveRoom() {
    this.room = <Room> {
      name: this.form.name,
      roomtype: this.form.roomtype,
      roomdetails: this.form.roomdetails,
      roomprice: this.form.roomprice,
      pricecurency: this.form.pricecurency,
      imagepath: this.imagesrc
    };
    this.roomService.saveRoom(this.room);
    this.dialogRef.close();
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        text: 'Camera',
        text2: 'adaugata',
        text3: 'a'
      }
    });

  }

  selectFiles({event}: { event: any }) {
    this.selectedFiles = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    var pattern = /image-*/;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      var reader = new FileReader();
      if (!this.selectedFiles[i].type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }

  _handleReaderLoaded(e: { target: any; }) {
    let reader = e.target;
    this.imagesrc.push(reader.result);

  }
}
