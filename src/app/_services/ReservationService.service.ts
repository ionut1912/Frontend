import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservations} from "../clases/Reservations";
import {RoomReservations} from "../clases/RoomReservations";

@Injectable({
  providedIn: 'root'
})
export  class ReservationService {
  private baseURL = "http://localhost:8081/reservations";
  constructor(private httpClient:HttpClient){

  }
  saveReservation(reservation:Reservations,roomreservation:RoomReservations):void{
      this.httpClient.post(`${this.baseURL}`,reservation);
      this.httpClient.post(`${this.baseURL}`,roomreservation);
  }

}
