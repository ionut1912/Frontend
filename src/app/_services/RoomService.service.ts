
import { Room} from '../clases/Room';
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReviewHelper} from '../clases/ReviewHelper';
import {throwPortalOutletAlreadyDisposedError} from '@angular/cdk/portal/portal-errors';
import {RoomDetails} from '../clases/RoomDetails';
import {TotalPrice} from '../clases/TotalPrice';

import {NrOfViewsHelper} from "../clases/NrOfViewsHelper";
import {NrOfFreeRoomsHelper} from "../clases/NrOfFreeRoomsHelper";
import {NrOfRoomsHelper} from "../clases/NrOfRoomsHelper";
import {NrRoomsByType} from "../clases/NrRoomsByType";
@Injectable({
    providedIn: 'root'
  })
  export class RoomService{
private baseURL = "http://localhost:8081/room";
constructor(private httpclient:HttpClient){}
findAll():Observable<Room[]>
{
    return this.httpclient.get<Room[]>(`${this.baseURL}/all`);
}
findAllById(id:number):Observable<Room>
{
  return this.httpclient.get<Room>(`${this.baseURL}/${id}`);

}

updateRoom(id:number,room:Room):Observable<Room>{
  return  this.httpclient.patch<Room>(`${this.baseURL}/${id}`,room)
}
  deleteRoom(id:number):void{
    this.httpclient.delete<Room>(`${this.baseURL}/${id}`).subscribe();
  }
  saveRoom(room:Room):void{
  this.httpclient.post<Room>(`${this.baseURL}`,room).subscribe();



  }
getPrice(checkin:Date,checkout:Date,id:number):Observable<TotalPrice>
{
  return  this.httpclient.get<TotalPrice>(`${this.baseURL}/${checkin}/${checkout}/${id}`)
}

  getNrOfFreeRooms(type:string):Observable<NrOfFreeRoomsHelper>
  {
    return  this.httpclient.get<NrOfFreeRoomsHelper>(`${this.baseURL}/freerooms/${type}`);
  }
getNrOfRooms():Observable<NrOfRoomsHelper>{
  return  this.httpclient.get<NrOfRoomsHelper>(`${this.baseURL}/nrofrooms`);
}
getNrOfRoomsByType():Observable<NrRoomsByType[]>{
  return  this.httpclient.get<NrRoomsByType[]>(`${this.baseURL}/nrroomsbytype`);
}
}
