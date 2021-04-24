export class Reservations{
    reservationsId!: number;
    name!: string;

    email!: string;
    roomtype!: string;
    checkin!: Date;
    checkout!: Date;

    deleted!: boolean;
    userid!:number;
constructor(private  Name:string,private Email:string,private roomType:string,Checkin:Date,Checkout:Date,Deleted:boolean,useiId:number){

}
}
