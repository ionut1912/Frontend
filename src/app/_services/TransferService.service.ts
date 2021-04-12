import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TransferService{
    checkin!: Date;
    checkout!: Date;
    noofrooms!:number;
    noofadults!:number;
    noofchildrens!:number
    constructor(){

    }
}
