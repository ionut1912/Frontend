import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../_services/ReservationService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {UserService} from "../_services/UserService.service";
import {UserData} from "../clases/UserData";
import {Reservation} from "../clases/Reservation";
import {privateEntriesToIndex} from "@angular/compiler-cli/src/metadata/index_writer";
import {patchTsGetExpandoInitializer} from "@angular/compiler-cli/ngcc/src/packages/patch_ts_expando_initializer";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit,AfterViewInit{
userDetails:UserData=new UserData();
  columns: string[] =['name', 'email', 'roomtype','checkin','checkout','action'];
rezervationInfo:Reservation[]=[];
  constructor(private  reservationService:ReservationService,private  tokenStorage:TokenStorageService,private  userService:UserService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource=new MatTableDataSource<Reservation>();
  ngOnInit(): void {
    this.getReservationByUserid();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
getReservationByUserid(){
  this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userInfo=>{
    this.userDetails=userInfo;
console.log(this.userDetails);
    this.reservationService.getRezervationByUserId(this.userDetails.userid).subscribe(rezervation=>{
     this.rezervationInfo=rezervation;
          for(let i=0;i<this.rezervationInfo.length;i++)
          {
            if(this.rezervationInfo[i].deleted)
              this.rezervationInfo.splice(i,1);

          }

    });
  });
}

}
