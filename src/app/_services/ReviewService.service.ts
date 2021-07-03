import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ReviewDetails} from '../clases/ReviewDetails';
import {ReviewHelper} from '../clases/ReviewHelper';
import {UserRoomsHelpers} from '../clases/UserRoomsHelpers';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  private baseURL = 'http://localhost:8082/reviews';

  constructor(private httpclient: HttpClient,private  snackBar:MatSnackBar) {
  }

  getReviews(id: number): Observable<ReviewDetails[]> {
    return this.httpclient.get<ReviewDetails[]>(`${this.baseURL}/${id}`);
  }
  saveReview(helper:ReviewHelper):void{
    this.httpclient.post<ReviewHelper>(`${this.baseURL}`,helper).subscribe(()=>{

    },
      error => {
      this.snackBar.open(error.error.message,"Inchide",{
        duration:3000
      });
      });
  }

}
