import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TransferService{
    checkin!: Date;
    checkout!: Date;
    constructor(){

    }
}
