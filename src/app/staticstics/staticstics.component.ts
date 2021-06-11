import { Component, OnInit } from '@angular/core';
import {RoomService} from "../_services/RoomService.service";
import {ReservationService} from "../_services/ReservationService.service";
import {UserService} from "../_services/UserService.service";
import {NrOfUsersHelper} from "../clases/NrOfUsersHelper";
import {NrOfRoomsHelper} from "../clases/NrOfRoomsHelper";
import {NrOfReservationsHelper} from "../clases/NrOfReservationsHelper";
import {FreeRoomsByType} from "../clases/FreeRoomsByType";
import {NrOfUserReservations} from "../clases/NrOfUserReservations";
import {NrRoomsByType} from "../clases/NrRoomsByType";
import {ReservationsByType} from "../clases/ReservationsByType";
import {UserByType} from '../clases/UserByType';


import {ChartType, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';


@Component({
  selector: 'app-staticstics',
  templateUrl: './staticstics.component.html',
  styleUrls: ['./staticstics.component.css']
})
export class StaticsticsComponent implements  OnInit{
nrOfUsers:NrOfUsersHelper=new NrOfUsersHelper();
nrOfRooms:NrOfRoomsHelper=new NrOfRoomsHelper();
nrOfReservations:NrOfReservationsHelper=new NrOfReservationsHelper();
freeRoomsByType:FreeRoomsByType[]=[];
nrOfUserReservations:NrOfUserReservations[]=[];
nrOfRoomsByType:NrRoomsByType[]=[];
nrOfReservationsByType: ReservationsByType[]=[];
userByType!: UserByType[];
  public pieChartOptions: ChartOptions = {
    responsive: true,



  };
  public pieChartLabelsUsers: Label[] = [];
  public pieChartDataUsers: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public pieChartLabelsReservations: Label[] = [];
  public pieChartDataReservations: number[] = [];
  public pieChartLabelsRoomsByType: Label[] = [];
  public pieChartDataRoommsByType: number[] = [];
  public pieChartLabelsUserReservations: Label[] = [];
  public pieChartDataUserReservations: number[] = [];
  public pieChartLabelFreeRooms: Label[] = [];
  public pieChartDataFreeRooms: number[] = [];
  constructor(public  roomService: RoomService,public reservationService:ReservationService,public  userService:UserService) {



  }
  ngOnInit(): void {
this.userService.getNrOfUsers().subscribe(numberOfUsers => {
  this.nrOfUsers =numberOfUsers;

});
this.roomService.getNrOfRooms().subscribe(numberOfRooms =>{
  this.nrOfRooms = numberOfRooms;

});
this.reservationService.getNrOfReservations().subscribe(numberOfReservations=>{
  this.nrOfReservations = numberOfReservations;
});
this.reservationService.getNrOfFreeRooms().subscribe(nrOfFreerooms=>{
  this.freeRoomsByType = nrOfFreerooms;
for(let  i=0;i<this.freeRoomsByType.length;i++){
  this.pieChartLabelFreeRooms.push(this.freeRoomsByType[i].roomtype);
this.pieChartDataFreeRooms.push(this.freeRoomsByType[i].nroffreeromsbytype);
}

});
this.userService.getUserReservations().subscribe(information=>{
  this.nrOfUserReservations=information;
for(let  i=0;i<this.nrOfUserReservations.length;i++)
{
  this.pieChartLabelsUserReservations.push(this.nrOfUserReservations[i].username);
  this.pieChartDataUserReservations.push(this.nrOfUserReservations[i].nrofuserreservations);
}
});
this.roomService.getNrOfRoomsByType().subscribe(nrOfRoomsByTypeData=>{
  this.nrOfRoomsByType=nrOfRoomsByTypeData;
  for(let i=0;i<this.nrOfRoomsByType.length;i++){
    this.pieChartLabelsRoomsByType.push(this.nrOfRoomsByType[i].roomtype);
    this.pieChartDataRoommsByType.push(this.nrOfRoomsByType[i].nrofroomsbytype);
  }

});
this.reservationService.getNrOfReservedRooms().subscribe(data=>{
  this.nrOfReservationsByType =  data;
  for(let i=0;i<this.nrOfReservationsByType.length;i++) {
   this.pieChartLabelsReservations.push(this.nrOfReservationsByType[i].roomtype);
   this.pieChartDataReservations.push(this.nrOfReservationsByType[i].nrofreservations);
  }
});
this.userService.getNrOfUsersByType().subscribe(dataType=>{
  this.userByType=dataType;
for(let i=0;i<this.userByType.length;i++){
  this.pieChartLabelsUsers.push(this.userByType[i].type);
  this.pieChartDataUsers.push(this.userByType[i].nrofusersbytype);
}
});
  }

}
