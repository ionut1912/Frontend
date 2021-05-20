
import { Room} from '../clases/Room';
import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReviewHelper} from '../clases/ReviewHelper';
import {throwPortalOutletAlreadyDisposedError} from '@angular/cdk/portal/portal-errors';
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
  console.log(room);


  }


}
