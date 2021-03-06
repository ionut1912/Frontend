import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/UserService.service';
import {ReviewService} from '../_services/ReviewService.service';
import {UserData} from '../clases/UserData';
import {ReviewHelper} from '../clases/ReviewHelper';
import {TokenStorageService} from '../_services/token-storage.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

import {UserRoomsHelpers} from '../clases/UserRoomsHelpers';

@Component({
  selector: 'app-room-review',
  templateUrl: './room-review.component.html',
  styleUrls: ['./room-review.component.css']
})
export class RoomReviewComponent implements OnInit {
  reviews!: FormGroup;
  formErors: any;
  form: any = {
    reviewtitle: null,
    reviewtext: null,
    roomid: null,

  };

  user: UserData = new UserData();



  constructor(public matSnackbar: MatSnackBar, private builder: FormBuilder, public  userService: UserService, public reviewService: ReviewService, public  tokenStorage: TokenStorageService) {

    this.reviews = this.builder.group({
      reviewtitle: ['', Validators.required],
      reviewtext: ['', Validators.required],
      roomid: ['', Validators.required]
    });

    this.formErors = {
      reviewtitle: {},
      reviewtext: {},

      roomid: {},
    };

  }

  ngOnInit(): void {
this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(data=>{
  this.user=data;
})






  }

  onSubmit(): void {
    this.saveReview();


  }

  saveReview() {


        this.reviewService.saveReview({
          reviewTitle: this.form.reviewtitle,
          reviewText: this.form.reviewtext,
          userId: this.user.userid,
          roomId: this.form.roomid
        });
        this.matSnackbar.open('Review-ul a fost adaugat cu succes', 'Inchide', {
          duration: 3000
        });
      }




}

