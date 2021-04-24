import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../clases/UserData";
import {Reservations} from "../clases/Reservations";
import {RoomReservations} from "../clases/RoomReservations";

@Injectable({
  providedIn: 'root'
})
export  class ReservationService {
  private baseURL = "http://localhost:8081/reservations";
  constructor(private httpClient:HttpClient){

  }
  saveReservation(reservation:Reservations):Observable<Object>{
    return  this.httpClient.post(`${this.baseURL}`,reservation);
  }
  saveRoomReservation(roomreservation:RoomReservations):Observable<Object>{
    return  this.httpClient.post(`${this.baseURL}/roomreservations`,roomreservation);
  }
}
