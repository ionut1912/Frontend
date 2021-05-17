import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Users} from '../clases/Users';
import {Room} from '../clases/Room';
import {RoomService} from '../_services/RoomService.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/UserService.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TokenStorageService} from '../_services/token-storage.service';
import {DialogDataExampleDialog} from '../userdata/userdata.component';
import { ViewUsersComponent} from '../view-users/view-users.component';
export  interface EditRoomInterface {
  roomid:number,
  name:string,
  roomtype:string,
  roomdetails:string,
  roomprice:number,
  pricecurency:string
}
export  interface DeleteRoomInterface {
  roomid:number,
}
@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit {
  columns: string[] = ['roomid', 'name', 'roomtype', 'roomdetails', 'roomprice', 'pricecurency', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public  roomService: RoomService,public  dialog:MatDialog) {
  }

  public dataSource = new MatTableDataSource<Room>();

  ngOnInit(): void {
    this.roomService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  addRoom() {
this.dialog.open(AddRoom);
  }

  edit(roomid: number, name: string, roomtype: string,roomdetails:string, roomprice: number, pricecurency: number) {
this.dialog.open(EditRoom,{
  data:{
    roomid:roomid,
    name:name,
    roomtype:roomtype,
    roomdetails:roomdetails,
    roomprice:roomprice,
    pricecurency:pricecurency

  }
});
  }

  delete(roomid: number) {
    this.dialog.open(DeleteRoom,{
      data:{
        roomid:roomid
      }
    })
  }
}

@Component({
  selector: 'add-room',
  templateUrl: 'add-room.html',
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
  user: Users = new Users();

  constructor(private builder: FormBuilder,  public dialogRef: MatDialogRef<ViewRoomsComponent>, public  dialog: MatDialog,public  roomService:RoomService) {

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
      pricecurency:{}
    };

  }

  onSubmit() {
this.saveUser();
  }
saveUser():void{
    this.roomService.saveRoom(<Room> {
      name: this.form.name,
      roomtype: this.form.roomtype,
      roomdetails: this.form.roomdetails,
      roomprice: this.form.roomprice,
      pricecurency: this.form.pricecurency
    }).subscribe(()=>{
this.dialogRef.close();
this.dialog.open(DialogDataExampleDialog,{
  data: {
    text: 'Camera',
    text2: 'adaugata',
    text3: 'a'
  }
})

})


}

}
@Component({
  selector: 'edit-room',
  templateUrl: 'edit-room.html',
})
export class EditRoom {
  rooms!: FormGroup;
  formErors: any;
constructor(@Inject(MAT_DIALOG_DATA) public data: EditRoomInterface,public dialogRef: MatDialogRef<ViewRoomsComponent>,public  dialog:MatDialog,private builder: FormBuilder,public  roomService:RoomService){

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
    pricecurency:{}
  };

}
  onSubmit() {
this.editRoom();
  }
  editRoom():void{
  this.roomService.updateRoom(this.data.roomid,<Room> {
    name: this.data.name,
    roomtype: this.data.roomtype,
    roomdetails: this.data.roomdetails,
    roomprice: this.data.roomprice,
    pricecurency: this.data.pricecurency
  }).subscribe(()=>{
    this.dialogRef.close();
    this.dialog.open(DialogDataExampleDialog,{
        data: {
          text: 'Camera',
          text2: 'modificata',
          text3: 'a'

      }
    })
  });

  }
}
@Component({
  selector: 'delete-room',
  templateUrl: 'delete-room.html',
})
export  class DeleteRoom {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteRoomInterface,public dialogRef: MatDialogRef<ViewRoomsComponent>,public  dialog:MatDialog,public  roomService:RoomService){

  }

  da() {
this.deleteRoom();
  }
deleteRoom(){
    this.roomService.deleteRoom(this.data.roomid);
    this.dialogRef.close();
    this.dialog.open(DialogDataExampleDialog,{
      data:{
        text: 'Camera',
        text2: 'stearsa',
        text3: 'a'

      }
    })
}
  nu() {
    this.dialogRef.close();
  }
}