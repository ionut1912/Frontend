
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RoomImage } from '../clases/RoomImage';

@Injectable({
    providedIn: 'root'
  })
  export class ImageService{
private baseURL = "http://localhost:8081/room";

constructor(private httpclient:HttpClient){

}
getRoomImage():Observable<RoomImage[]>
{
    return this.httpclient.get<RoomImage[]>(`${this.baseURL}/images`);
}
}