import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from '../_services/ReservationService.service';
import {Reservation} from '../clases/Reservation';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-view-all-reservations',
  templateUrl: './view-all-reservations.component.html',
  styleUrls: ['./view-all-reservations.component.css']
})
export class ViewAllReservationsComponent implements OnInit {
  columns: string[] = ['reservationid','name', 'email', 'roomtype', 'checkin', 'checkout'];
reservation:Reservation[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource=new MatTableDataSource<Reservation>();
  constructor(public  reservationService:ReservationService) { }

  ngOnInit(): void {
this.reservationService.getRezervation().subscribe(data=>{
this.reservation=data;
this.dataSource=new MatTableDataSource(this.reservation);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
});
  }

}
