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
export interface EditRezervationData {
  rezervationId:number,
  Name:string;
  Email:string;
  RoomType:string;
  Checkin:Date;
  Checkout:Date,
  dataSource:MatTableDataSource<Reservation>

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
  constructor(public dialogRef: MatDialogRef<ViewReservationsComponent>, @Inject(MAT_DIALOG_DATA) public data: EditRezervationData,public userService:UserService, public  rezervationService: ReservationService, public dialog: MatDialog,public  tokenStorage:TokenStorageService) {
    this.date1 = new FormControl(new Date(data.Checkin));
    this.date2 = new FormControl(new Date(data.Checkout));

  }
  onSubmit(): void{
    this.rezervation = <Reservation> ({
      name: this.data.Name,
      email: this.data.Email,
      roomtype: this.data.RoomType,
      checkin: new Date(this.date1.value),
      checkout: new Date(this.date2.value)
    });


    this.rezervationService.modifyRezervation(this.data.rezervationId, this.rezervation).subscribe(rezdata=>{
      this.refresh();
      this.dialogRef.close();

      const dialogRef2 = this.dialog.open(DialogDataExampleDialog, {
        data: {
          text: 'Rezervarea',
          text2: 'modificata',
          text3: 'a',
          dataSource:this.data.dataSource
        }
      });

    });

  }
  refresh():void{
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInformation=> {
      this.user = userInformation;
      this.rezervationService.getRezervationByUserId(this.user.userid).subscribe(rezervationInfo=>{
        this.data.dataSource=new MatTableDataSource(rezervationInfo);
      });
    });
  }

}
