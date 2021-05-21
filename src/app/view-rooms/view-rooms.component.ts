import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Room} from '../clases/Room';
import {RoomService} from '../_services/RoomService.service';

import {DeleteRoom} from '../delete-room/delete-room.component';
import {EditRoom} from '../edit-room/edit-room.component';
import {AddRoom} from '../add-room/add-room.component';
import {MatDialog} from '@angular/material/dialog';




export interface DeleteRoomInterface {
  roomid: number,
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
  room: Room[] = [];

  constructor(public  roomService: RoomService, public  dialog: MatDialog) {
  }

  public dataSource = new MatTableDataSource<Room>();

  ngOnInit(): void {
    this.roomService.findAll().subscribe(data => {
      this.room = data;
      this.dataSource = new MatTableDataSource(this.room);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
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
}




