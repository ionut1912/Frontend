import { RoomImage } from './../clases/RoomImage';

export interface RoomDetails {
    name: string;
    roomtype: string;
    roomdetails: string;
    roomid: number;
    checkin: Date;
    checkout: Date;
    images: RoomImage[];
}
