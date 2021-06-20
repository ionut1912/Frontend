import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationsHelper} from '../clases/ReservationsHelper';
import {Observable} from 'rxjs';
import {RoomReservation} from '../clases/RoomReservation';

import {Reservation} from '../clases/Reservation';
import {UserReservationHelper} from '../clases/UserReservationHelper';
import {NrOfReservationsHelper} from '../clases/NrOfReservationsHelper';
import {ReservationsByType} from '../clases/ReservationsByType';
import {FreeRoomsByType} from '../clases/FreeRoomsByType';


@Injectable({
  providedIn: 'root'
})
export  class ReservationService {
  private baseURL = 'http://localhost:8082/reservations';

  constructor(private httpClient: HttpClient) {

  }

  saveReservation(reservation: ReservationsHelper): void {
    console.log(reservation);

    this.httpClient.post<ReservationsHelper>(`${this.baseURL}`, reservation).subscribe((data)=>{
console.log(data);
    },
      err=>{
      console.log(err.error.mesage);
      }
      );

  }

  getAll(): Observable<RoomReservation[]> {
    return this.httpClient.get<RoomReservation[]>(`${this.baseURL}`);
  }
getRezervationByUserId(id:number):Observable<UserReservationHelper[]>{
    return  this.httpClient.get<UserReservationHelper[]>(`${this.baseURL}/${id}`);
}
modifyRezervation(id:number,reservation:Reservation):Observable<Reservation>{
    return  this.httpClient.patch<Reservation>(`${this.baseURL}/${id}`,reservation);
}
  deleteRezervation(id:number,reservation:Reservation):Observable<Reservation>{
    return  this.httpClient.patch<Reservation>(`${this.baseURL}/delete/${id}`,reservation);
  }
  getRezervation():Observable<Reservation[]>{
    return  this.httpClient.get<Reservation[]>(`${this.baseURL}/all`)
  }
  getNrOfReservations():Observable<NrOfReservationsHelper>{
    return  this.httpClient.get<NrOfReservationsHelper>(`${this.baseURL}/nrofreservations`);
  }
getNrOfFreeRooms():Observable<FreeRoomsByType[]>{
    return  this.httpClient.get<FreeRoomsByType[]>(`${this.baseURL}/freeroomsbytype`);

}
  getNrOfReservedRooms():Observable<ReservationsByType[]>{
    return  this.httpClient.get<ReservationsByType[]>(`${this.baseURL}/roomsbytype`);
  }
}
