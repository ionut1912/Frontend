
import { Room} from '../clases/Room';
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReviewHelper} from '../clases/ReviewHelper';
import {throwPortalOutletAlreadyDisposedError} from '@angular/cdk/portal/portal-errors';
import {RoomDetails} from '../clases/RoomDetails';
import {TotalPrice} from '../clases/TotalPrice';
import {RoomsViewed} from "../clases/RoomsViewed";
import {NrOfViewsHelper} from "../clases/NrOfViewsHelper";
import {NrOfFreeRoomsHelper} from "../clases/NrOfFreeRoomsHelper";
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
saveViews(roomViewed:RoomsViewed):Observable<RoomsViewed>{
  return  this.httpclient.post<RoomsViewed>(`${this.baseURL}/views`,roomViewed)
}
  getNrOfViewsById(id:number):Observable<NrOfViewsHelper>{
    return  this.httpclient.get<NrOfViewsHelper>(`${this.baseURL}/views/${id}`);
  }
  getNrOfFreeRooms(type:string):Observable<NrOfFreeRoomsHelper>
  {
    return  this.httpclient.get<NrOfFreeRoomsHelper>(`${this.baseURL}/freerooms/${type}`);
  }

}
