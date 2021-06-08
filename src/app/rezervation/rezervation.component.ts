import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-rezervation',
  templateUrl: './rezervation.component.html',
  styleUrls: ['./rezervation.component.css']
})
export class RezervationComponent implements OnInit {
  form: any = {
    checkin: null,
    checkout: null,


  };
  submitted = false;
  diplay = false;

  constructor(private  matSnackbar:MatSnackBar) {
  }

  ngOnInit() {


  }

  onSubmit() {
    this.submitted = true;


  }

  myfunc() {

    if(this.form.checkin >this.form.checkout){
this.matSnackbar.open("Checkin-ul trebuie sa fie mai mic decat checkout-ul","Inchide",{
  duration: 3000
});
    }
    else {
      this.diplay=true;
    }
  }



}
