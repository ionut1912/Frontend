import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserData} from '../clases/UserData';
import {ReviewHelper} from '../clases/ReviewHelper';
import {UserService} from '../_services/UserService.service';
import {ReviewService} from '../_services/ReviewService.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Users} from '../clases/Users';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-hotel-review',
  templateUrl: './hotel-review.component.html',
  styleUrls: ['./hotel-review.component.css']
})
export class HotelReviewComponent implements OnInit {
  hotelreviews!:FormGroup;
  formErors:any;
  form: any = {
   reviewhotel:null

  };
  user:UserData=new UserData();
  reviewHelper:ReviewHelper=new ReviewHelper();
  constructor(private  matSnackBar:MatSnackBar,private builder: FormBuilder,public  userService:UserService,public  tokenStorage:TokenStorageService) {

    this.hotelreviews = this.builder.group({
      reviewhotel:              ['', Validators.required],

    });

    this.formErors = {
      reviewhotel:        {},

    };

  }


  ngOnInit(): void {
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(info=>{
      this.user=info;

    });
  }
  onSubmit():void{
this.saveHotelReview();
  }
  saveHotelReview()
  {
    this.userService.setHotelReview(this.user.userid,<Users> {
      hotelreview: this.form.reviewhotel
    }).subscribe(data=>{

    });
    this.matSnackBar.open('Review ul a fost adaugat cu succes','Inchide',{
    duration: 3000
  });

  }

}
