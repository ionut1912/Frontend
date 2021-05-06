import { Reservations } from './Reservations';
import { Price } from './Price';

import {Room} from './Room';

export class RoomReservations{
    roomid!: number
   priceid!: number;

   checkin!: Date;
   checkout!: Date;
   noofrooms!: number;
   noofadults!: number;
   noofchildrens!: number;



}
