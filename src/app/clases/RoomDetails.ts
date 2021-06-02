import {RoomImage} from './../clases/RoomImage';

export class RoomDetails {
  name!: string;
  roomtype!: string;
  roomdetails!: string;
  roomid!: number;
  roomprice!: number;
  pricecurency!: string;
  images: RoomImage[] = [];
}
