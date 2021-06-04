import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Reservation} from '../clases/Reservation';
import {UserData} from '../clases/UserData';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../_services/UserService.service';
import {ReservationService} from '../_services/ReservationService.service';
import {TokenStorageService} from '../_services/token-storage.service';

import {MatTableDataSource} from '@angular/material/table';
import {ViewReservationsComponent} from '../view-reservations/view-reservations.component';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {MatSnackBar} from "@angular/material/snack-bar";
export interface EditRezervationData {
  rezervationId:number,
  name:string;
  email:string;
  roomType:string;
  checkin:Date;
  checkout:Date,


}
@Component({
  selector: 'edit-rezervation',
  templateUrl: 'edit-rezervation.component.html',
})

export class EditRezervationComponent {
  date1!: FormControl;
  date2!: FormControl;
  rezervation: Reservation=new Reservation();
  rezervations:Reservation[]=[];
  user:UserData=new UserData();
  constructor(private  snackBar:MatSnackBar,public dialogRef: MatDialogRef<ViewReservationsComponent>, @Inject(MAT_DIALOG_DATA) public data: EditRezervationData,public userService:UserService, public  rezervationService: ReservationService, public dialog: MatDialog,public  tokenStorage:TokenStorageService) {
    this.date1 = new FormControl(new Date(data.checkin));
    this.date2 = new FormControl(new Date(data.checkout));

  }
  onSubmit(): void{
    this.rezervation = <Reservation> ({
      name: this.data.name,
      email: this.data.email,
      roomtype: this.data.roomType,
      checkin: new Date(this.date1.value),
      checkout: new Date(this.date2.value)
    });


    this.rezervationService.modifyRezervation(this.data.rezervationId, this.rezervation).subscribe(rezdata=>{


      });

    this.dialogRef.close();


    this.snackBar.open('Rezervarea a fost modificata cu succes','Inchide',{
      duration: 3000
    });

  }

}
