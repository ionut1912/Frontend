import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from '../_services/ReservationService.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {UserService} from '../_services/UserService.service';
import {UserData} from '../clases/UserData';
import {Reservation} from '../clases/Reservation';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogDataExampleDialog} from '../userdata/userdata.component';



export interface EditRezervationData {
  rezervationId:number,
  Name:string;
  Email:string;
  RoomType:string;
  Checkin:Date;
  Checkout:Date

}
export interface DeleteReervationData {
  rezervationId:number
}
@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit,AfterViewInit {
  userDetails: UserData = new UserData();
  columns: string[] = ['reservationid','name', 'email', 'roomtype', 'checkin', 'checkout', 'action'];
  rezervationInfo: Reservation[] = [];
  date1:FormControl[]=[];
  date2:FormControl[]=[];
  constructor(private  reservationService: ReservationService, private  tokenStorage: TokenStorageService, private  userService: UserService,public  dialog:MatDialog) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id!: number;

  public dataSource=new MatTableDataSource<Reservation>();

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInfo => {
      this.userDetails = userInfo;

      this.reservationService.getRezervationByUserId(this.userDetails.userid).subscribe(rezervation => {
        this.rezervationInfo=rezervation;
        for(let i=0;i<this.rezervationInfo.length;i++)
        {
          if(this.rezervationInfo[i].deleted)
          {
            this.rezervationInfo.splice(i,1);
          }
        }
        this.dataSource = new MatTableDataSource(this.rezervationInfo);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });


    });
  }


  edit(id: number, name: string, email:string , roomtype: string, checkin: Date, checkout: Date): void {
    this.id = id;
    const dialogRef=this.dialog.open(EditRezervationComponent,{
      data:{
        rezervationId:id,
        Name:name,
        Email:email,
        RoomType:roomtype,
        Checkin:checkin,
        Checkout:checkout,

      }

    });
dialogRef.afterClosed().subscribe(information=>{
  this.rezervationInfo=information;
})


  }

  delete(rezervationid: number) {
    this.id=rezervationid;
    const dialogRef=this.dialog.open(DeleteRezervationComponent,{
      data:{
        rezervationId:rezervationid
      }

    });

  }
}

@Component({
  selector: 'app-edit-rezervation',
  templateUrl: 'edit-rezervation.html',
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
    this.rezervation = ({
      name: this.data.Name,
      email: this.data.Email,
      roomtype: this.data.RoomType,
      checkin: new Date(this.date1.value),
      checkout: new Date(this.date2.value)
    } as Reservation);
    this.rezervationService.modifyRezervation(this.data.rezervationId, this.rezervation).subscribe(rezdata=>{

      this.dialogRef.close();
      const dialogRef2 = this.dialog.open(DialogDataExampleDialog, {
        data: {
          text: 'Rezervarea',
          text2: 'modificata',
          text3: 'a'
        }
      });

    });

  }


}
@Component({
  selector: 'app-delete-rezervation',
  templateUrl: 'delete-rezervation.html',
})

export class DeleteRezervationComponent {
rezervation!: Reservation;
constructor(public dialogRef: MatDialogRef<ViewReservationsComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteReervationData, public dialog1: MatDialog, public  rezervationService: ReservationService) {


  }


  nu(): void{
this.dialogRef.close();
  }

  da(): void{

this.rezervation =({
  rezervationid: this.data.rezervationId
} as Reservation)
this.rezervationService.deleteRezervation(this.data.rezervationId,this.rezervation).subscribe(() =>{
  this.dialogRef.close();
const  ref = this.dialog1.open(DialogDataExampleDialog, {
  data: {
    text: 'Rezervarea',
    text2: 'stearsa',
    text3: 'a'
  }
  });
});
  }
}
