import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Room} from '../clases/Room';
import {RoomService} from '../_services/RoomService.service';

import {DeleteRoom} from '../delete-room/delete-room.component';
import {EditRoom} from '../edit-room/edit-room.component';
import {AddRoom} from '../add-room/add-room.component';
import {MatDialog} from '@angular/material/dialog';
import {ViewRoomImagesComponent} from '../view-room-images/view-room-images.component';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {throwUnknownPortalTypeError} from "@angular/cdk/portal/portal-errors";






@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css']
})
export class ViewRoomsComponent implements OnInit,AfterViewInit {
  columns: string[] = ['roomid', 'name', 'roomtype', 'roomdetails', 'roomprice', 'pricecurency', 'action','create_room'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  room: Room[] = [];
  roomById: Room[] = [];
  roomByName: Room[] = [];
  roomByRoomType: Room[] = [];
  roomByDetails: Room[] = [];
  roomByPrice: Room[] = [];
  form:any={
  roomid:null,
  name:null,
  roomtype:null,
  roomdetails:null,
  roomprice:null

}
search!: FormGroup
  constructor(public  matSnackbar:MatSnackBar,public  roomService: RoomService, public  dialog: MatDialog,private  formbuilder:FormBuilder) {
    this.search = this.formbuilder.group({
      roomid: [''],
      name: [''],
      roomtype: [''],
      roomdetails: [''],
      roomprice: [''],

    });
  }

  ngAfterViewInit(): void {
    this.roomService.findAll().subscribe(data => {
      this.room = data;
      this.dataSource = new MatTableDataSource(this.room);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    }

  public dataSource = new MatTableDataSource<Room>();

  ngOnInit(): void {

  }

  addRoom() {
    this.dialog.open(AddRoom);
  }

  edit(roomid: number, name: string, roomtype: string, roomdetails: string, roomprice: number, pricecurency: number) {
    this.dialog.open(EditRoom, {
      data: {
        roomid: roomid,
        name: name,
        roomtype: roomtype,
        roomdetails: roomdetails,
        roomprice: roomprice,
        pricecurency: pricecurency

      }
    });
  }

  delete(roomid: number) {
    this.dialog.open(DeleteRoom, {
      data: {
        roomid: roomid
      }
    });
  }

  viewImages(id:number) {
    this.dialog.open(ViewRoomImagesComponent,{
      data:{
        roomid:id
      }
    });
  }

  searchByRoomId() {
this.roomById=this.room.filter(x=>x.roomid==this.form.roomid);
if(this.roomById.length==0)
{
  this.matSnackbar.open("Camera cu id-ul " + `${this.form.roomid}` + " nu exista" ,"Inchide" ,{
    duration:3000
  });
}
else {
  this.matSnackbar.open("Camera cu id-ul " + `${this.form.roomid}` + " a fost gasita" ,"Inchide" ,{
    duration:3000
  });
  this.dataSource=new MatTableDataSource(this.roomById);
  this.dataSource.sort=this.sort;
  this.dataSource.paginator=this.paginator;
}
  }

  searchByName() {
if(this.roomById.length>0){
  this.roomByName=this.roomById.filter(x=>x.name==this.form.name);

}
else {
  this.roomByName=this.room.filter(x=>x.name==this.form.name);
}
if(this.roomByName.length==0){
  this.matSnackbar.open("Camera cu numele " + `${this.form.name}` + " nu exista" ,"Inchide" ,{
    duration:3000
  });
}
else {
  this.matSnackbar.open("Camera cu numele " + `${this.form.name}` + " a fost gasita" ,"Inchide" ,{
    duration:3000
  });
  this.dataSource=new MatTableDataSource(this.roomByName);
  this.dataSource.sort=this.sort;
  this.dataSource.paginator=this.paginator;
}
  }

  searchByRoomType() {
    if(this.roomById.length>0){
      this.roomByRoomType=this.roomById.filter(x=>x.roomtype==this.form.roomtype);

    }
    else if (this.roomByName.length>0){
      this.roomByRoomType=this.roomByName.filter(x=>x.roomtype==this.form.roomtype);
    }
    else
    {
      this.roomByRoomType=this.room.filter(x=>x.roomtype==this.form.roomtype);
    }
    if(this.roomByRoomType.length==0){
      this.matSnackbar.open("Camera cu tipul " + `${this.form.roomtype}` + " nu exista" ,"Inchide" ,{
        duration:3000
      });
    }
    else {
      this.matSnackbar.open("Camera cu tipul " + `${this.form.roomtype}` + " a fost gasita" ,"Inchide" ,{
        duration:3000
      });
      this.dataSource=new MatTableDataSource(this.roomByRoomType);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    }
  }



  searchByRoomPrice() {
    if(this.roomById.length>0){
      this.roomByPrice=this.roomById.filter(x=>x.roomprice==this.form.roomprice);
    }
    else if (this.roomByName.length>0){
      this.roomByPrice=this.roomByName.filter(x=>x.roomprice==this.form.roomprice);
    }
    else  if(this.roomByRoomType.length>0){
      this.roomByPrice=this.roomByRoomType.filter(x=>x.roomprice==this.form.roomprice);
    }
    else {
      this.roomByPrice=this.room.filter(x=>x.roomprice==this.form.roomprice);
    }
    if(this.roomByPrice.length==0){
      this.matSnackbar.open("Camera cu pretul " + `${this.form.roomprice}` + " nu exista" ,"Inchide" ,{
        duration:3000
      });
    }
    else {

      this.matSnackbar.open("Camera cu pretul " + `${this.form.roomprice}` + " a fost gasita" ,"Inchide" ,{
        duration:3000
      });
      this.dataSource=new MatTableDataSource(this.roomByPrice);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    }
  }
}




