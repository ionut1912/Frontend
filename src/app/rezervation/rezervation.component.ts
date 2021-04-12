import { TransferService } from './../_services/TransferService.service';


import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-rezervation',
  templateUrl: './rezervation.component.html',
  styleUrls: ['./rezervation.component.css']
})
export class RezervationComponent implements OnInit {
  form: any={
 checkin:null,
 checkout:null,
 noofrooms:null ,
 noofadults:null,
 noofchildrens:null
  };
  submitted = false;
diplay=false;
  constructor(private transferService:TransferService) { }

  ngOnInit() {
     


  }
  onSubmit(){
    this.submitted=true;
    this.setData();
  
  }
myfunc(){
this.diplay=true;
}

setData():void{
  this.transferService.checkin=this.form.checkin;
  this.transferService.checkout=this.form.checkout;
  this.transferService.noofrooms=this.form.noofrooms;
  this.transferService.noofadults=this.form.noofadults;
  this.transferService.noofchildrens=this.form.noofchildrens;
  
}

}
