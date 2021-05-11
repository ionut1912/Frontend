import {RoomImage} from "./RoomImage";

export class Room{
    roomid!: number;
    name!: string;
    roomtype!: string;
    roomdetails!: string;
    roomstatus!: string;
    roomImage:RoomImage[]=[];

}
