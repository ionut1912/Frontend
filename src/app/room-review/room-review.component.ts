import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/UserService.service';
import {ReviewService} from '../_services/ReviewService.service';
import {UserData} from '../clases/UserData';
import {ReviewHelper} from '../clases/ReviewHelper';
import {TokenStorageService} from '../_services/token-storage.service';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

import {UserRoomsHelpers} from "../clases/UserRoomsHelpers";

@Component({
  selector: 'app-room-review',
  templateUrl: './room-review.component.html',
  styleUrls: ['./room-review.component.css']
})
export class RoomReviewComponent implements OnInit {
reviews!:FormGroup;
formErors:any;
  form: any = {
    reviewtitle: null,
    reviewtext: null,
    roomid: null,

  };

  user:UserData=new UserData();
  userRooms:UserRoomsHelpers[]=[];
  roomReviewed:UserRoomsHelpers[]=[];
foundRoom=false;
foundReview=false;
  constructor(public matSnackbar:MatSnackBar,private builder: FormBuilder,public  userService:UserService,public reviewService:ReviewService,public  tokenStorage:TokenStorageService) {

    this.reviews = this.builder.group({
      reviewtitle:              ['', Validators.required],
      reviewtext:                  ['', Validators.required],
      roomid:['',Validators.required]
    });

    this.formErors = {
      reviewtitle:        {},
      reviewtext:            {},

      roomid:            {},
    };

  }

  ngOnInit(): void {

this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(info=>{
  this.user=info;
  this.userService.getUserRooms(this.user.userid).subscribe(userRooomsInformation=>{
    this.userRooms = userRooomsInformation;
  });
  this.reviewService.getRoomReviewed(this.user.userid).subscribe(roomReviewedInfo=>{
this.roomReviewed =roomReviewedInfo;

  });

});

  }
onSubmit():void{
this.saveReview();


}
saveReview()
{

  for(let i=0;i<this.userRooms.length;i++){
    if(this.form.roomid==this.userRooms[i].roomid)
    {
      this.foundRoom=true;
    }
  }
  for(let i=0;i<this.roomReviewed.length;i++){
    if(this.form.roomid==this.roomReviewed[i].roomid){
      this.foundReview=true;
    }

  }
  if(this.foundRoom==false){
    this.matSnackbar.open('Camera cu id-ul ' + `${this.form.roomid}` +" nu exista","Inchide", {
      duration:3000
    })
  }
else if(this.foundReview==true)
{

    this.matSnackbar.open('Camera cu id-ul ' + `${this.form.roomid}` +" are deja un review","Inchide", {
      duration:3000
    })
}
else if(this.foundRoom==true)
{


      if(this.foundReview==false){
        this.reviewService.saveReview({
          reviewTitle:this.form.reviewtitle,
          reviewText:this.form.reviewtext,
          userId:this.user.userid,
          roomId:this.form.roomid
        });
        this.matSnackbar.open('Review-ul a fost adaugat cu succes','Inchide',{
          duration: 3000
        });
      }
    }
  }


}

