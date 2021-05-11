import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ReservationsHelper} from "../clases/ReservationsHelper";
import {Observable} from "rxjs";
import {RoomReservation} from "../clases/RoomReservation";
import {Room} from "../clases/Room";
import {throwPortalOutletAlreadyDisposedError} from "@angular/cdk/portal/portal-errors";
import {Reservation} from "../clases/Reservation";


@Injectable({
  providedIn: 'root'
})
export  class ReservationService {
  private baseURL = "http://localhost:8081/reservations";

  constructor(private httpClient: HttpClient) {

  }

  saveReservation(reservation: ReservationsHelper): void {
    this.httpClient.post<ReservationsHelper>(`${this.baseURL}`, reservation).subscribe();
  }

  getAll(): Observable<RoomReservation[]> {
    return this.httpClient.get<RoomReservation[]>(`${this.baseURL}`);
  }
getRezervationByUserId(id:number):Observable<Reservation[]>{
    return  this.httpClient.get<Reservation[]>(`${this.baseURL}/${id}`)
}

}
