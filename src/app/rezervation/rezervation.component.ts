

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
    this.setData();
  
  }
myfunc(){
this.diplay=true;
}

setData():void{
  localStorage.setItem("checkin", JSON.stringify(this.form.checkin));
localStorage.setItem("checkout",JSON.stringify(this.form.checkout));
localStorage.setItem("noofrooms",JSON.stringify(this.form.noofrooms));
localStorage.setItem("noofadults",JSON.stringify(this.form.noofadults));
localStorage.setItem("noofchildrens",JSON.stringify(this.form.noofchildrens));
  
}

}
