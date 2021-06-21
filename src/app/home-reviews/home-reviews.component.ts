import { Component, OnInit } from '@angular/core';
import { HotelReviewHelper } from '../clases/HotelReviewHelper';
import { UserService } from '../_services/UserService.service';

@Component({
  selector: 'app-home-reviews',
  templateUrl: './home-reviews.component.html',
  styleUrls: ['./home-reviews.component.css']
})
export class HomeReviewsComponent implements OnInit {
  hotelReview:HotelReviewHelper[]=[];
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getHotelReviews().subscribe(reviews=>{
      this.hotelReview=reviews;
  });

}
}
