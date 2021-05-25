
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RoomDetails } from '../clases/RoomDetails';
@Injectable({
    providedIn: 'root'
  })
  export class RoomDetailsService{
private baseURL = "http://localhost:8081/room";
constructor(private httpclient:HttpClient){}
getRoomInfo(checkin:Date,checkout:Date):Observable<RoomDetails[]>{
return this.httpclient.get<RoomDetails[]>(`${this.baseURL}/${checkin}/${checkout}`);
}
  getRoomDetails():Observable<RoomDetails[]>{
  return  this.httpclient.get<RoomDetails[]>(`${this.baseURL}/details`)
  }
}
