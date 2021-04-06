
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
 
  };
  submitted = false;
diplay=false;
  constructor() { }

  ngOnInit() {
     


  }
  onSubmit(){
    this.submitted=true;
  
  }
myfunc(){
this.diplay=true;
}
}
