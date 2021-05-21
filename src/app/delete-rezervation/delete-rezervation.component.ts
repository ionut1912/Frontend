import {Component, Inject} from '@angular/core';
import {Reservation} from '../clases/Reservation';
import {UserData} from '../clases/UserData';
import {UserService} from '../_services/UserService.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReservationService} from '../_services/ReservationService.service';

import {MatTableDataSource} from '@angular/material/table';
import { ViewReservationsComponent} from '../view-reservations/view-reservations.component';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
export interface DeleteReervationData {
  rezervationId:number,
  dataSource:MatTableDataSource<Reservation>
}
@Component({
  selector: 'delete-rezervation',
  templateUrl: 'delete-rezervation.component.html',
})

export class DeleteRezervationComponent {
  rezervation: Reservation = new Reservation();
  user: UserData = new UserData();

  constructor(public userService: UserService, public tokenStorage: TokenStorageService, public dialogRef: MatDialogRef<ViewReservationsComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteReervationData, public dialog1: MatDialog, public  rezervationService: ReservationService) {


  }


  nu(): void {
    this.dialogRef.close();
  }

  da(): void {

    this.rezervation = <Reservation> ({
      rezervationid: this.data.rezervationId
    });
    this.rezervationService.deleteRezervation(this.data.rezervationId, this.rezervation).subscribe(() => {
      this.refresh();
      this.dialogRef.close();
      const ref = this.dialog1.open(DialogDataExampleDialog, {
        data: {
          text: 'Rezervarea',
          text2: 'stearsa',
          text3: 'a'
        }
      });
    });
  }

  refresh(): void {
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInformation => {
      this.user = userInformation;
      this.rezervationService.getRezervationByUserId(this.user.userid).subscribe(rezervationInfo => {
        this.data.dataSource = new MatTableDataSource(rezervationInfo);
      });
    });
  }
}
