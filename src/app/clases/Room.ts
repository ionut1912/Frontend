import {RoomImage} from "./RoomImage";

export class Room{
    roomid!: number;
    name!: string;
    roomtype!: string;
    roomdetails!: string;
    roomprice!:number;
    pricecurency!:string;
    roomImage:RoomImage[]=[];

}
