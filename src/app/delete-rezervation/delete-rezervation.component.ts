import {Component, Inject} from '@angular/core';
import {Reservation} from '../clases/Reservation';
import {UserData} from '../clases/UserData';
import {UserService} from '../_services/UserService.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReservationService} from '../_services/ReservationService.service';


import { ViewReservationsComponent} from '../view-reservations/view-reservations.component';

import {MatSnackBar} from "@angular/material/snack-bar";
export interface DeleteReervationData {
  rezervationId:number
}
@Component({
  selector: 'delete-rezervation',
  templateUrl: 'delete-rezervation.component.html',
})

export class DeleteRezervationComponent {
  rezervation: Reservation = new Reservation();
  user: UserData = new UserData();

  constructor(private  snackBar:MatSnackBar,public userService: UserService, public tokenStorage: TokenStorageService, public dialogRef: MatDialogRef<ViewReservationsComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteReervationData, public dialog1: MatDialog, public  rezervationService: ReservationService) {


  }


  nu(): void {
    this.dialogRef.close();
  }

  da(): void {

    this.rezervation = <Reservation> ({
      rezervationid: this.data.rezervationId
    });
    this.rezervationService.deleteRezervation(this.data.rezervationId, this.rezervation).subscribe(() => {


  });
    this.dialogRef.close();
    this.snackBar.open('Rezervarea a fost stearsa cu succes','Inchide',{
      duration: 3000
    });

}
}
