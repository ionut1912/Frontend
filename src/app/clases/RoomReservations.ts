import { Reservations } from './Reservations';
import { Price } from './Price';

import {Room} from './Room';

export class RoomReservations{
    roomreservationid!: number;
    room!: number
   price!: number;
   reservation!: number;
   checkin!: Date;
   checkout!: Date;
   noofrooms!: number;
   noofadults!: number;
   noofchildrens!: number;


constructor(private Room:number,private  Price:number,private Reservation:number,Checkin:Date,Checkout:Date,Noofrooms:number,Noofadults:number,noofchildrens:number){

}
}
