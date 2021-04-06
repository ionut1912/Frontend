import { Reservations } from './Reservations';
import { Price } from './Price';

import {Room} from './Room';

export class RoomReservations{
    roomreservationid!: number;
    room!: Room;
   price!: Price;
   reservation!: Reservations;
   checkin!: Date;
   checkout!: Date;
   noofrooms!: number;
   noofadults!: number;
   noofchildrens!: number;
   childrenage!: number;
        

}