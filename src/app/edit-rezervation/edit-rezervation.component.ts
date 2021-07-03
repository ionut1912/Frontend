import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Reservation} from '../clases/Reservation';
import {UserData} from '../clases/UserData';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../_services/UserService.service';
import {ReservationService} from '../_services/ReservationService.service';
import {TokenStorageService} from '../_services/token-storage.service';

import {MatSnackBar} from '@angular/material/snack-bar';

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
  styleUrls: ['edit-rezervation.component.css']
})

export class EditRezervationComponent {
  date1!: FormControl;
  date2!: FormControl;
  rezervation: Reservation=new Reservation();
  rezervations:Reservation[]=[];
  user:UserData=new UserData();

  constructor(private  snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditRezervationComponent>, @Inject(MAT_DIALOG_DATA) public data: EditRezervationData, public userService: UserService, public  rezervationService: ReservationService, public dialog: MatDialog, public  tokenStorage: TokenStorageService) {
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
  if(this.rezervation.checkin>this.rezervation.checkout)
  {
    this.snackBar.open("Data de sosire nu poate fi mai mare ca data de plecare","Inchide",{
      duration:3000
    });
  }

    this.rezervationService.modifyRezervation(this.data.rezervationId, this.rezervation).subscribe(rezdata=>{


      },
      error => {
      this.snackBar.open(error.error.message,"Inchide",{
        duration: 3000
      });
      });

    this.dialogRef.close();


    this.snackBar.open('Rezervarea a fost modificata cu succes','Inchide',{
      duration: 3000
    });

  }

  close() {
    this.dialogRef.close();
  }
}
