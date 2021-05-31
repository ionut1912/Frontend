
import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from '../_services/UserService.service';
import {HotelReviewHelper} from '../clases/HotelReviewHelper';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements  OnInit{
  hotelReview:HotelReviewHelper[]=[];
  slideIndex = 1;
  parent = document.getElementsByClassName("mySlides");


  arrayUpdated: boolean = false;

  constructor(public  userService:UserService) {
  }

  ngOnInit(): void {
    this.userService.getHotelReviews().subscribe(reviews=>{
      this.hotelReview=reviews;

    });

  }




}
