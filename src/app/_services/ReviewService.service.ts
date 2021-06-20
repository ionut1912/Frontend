import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ReviewDetails} from '../clases/ReviewDetails';
import {ReviewHelper} from '../clases/ReviewHelper';
import {UserRoomsHelpers} from '../clases/UserRoomsHelpers';


@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  private baseURL = 'http://localhost:8082/reviews';

  constructor(private httpclient: HttpClient) {
  }

  getReviews(id: number): Observable<ReviewDetails[]> {
    return this.httpclient.get<ReviewDetails[]>(`${this.baseURL}/${id}`);
  }
  saveReview(helper:ReviewHelper):void{
    this.httpclient.post<ReviewHelper>(`${this.baseURL}`,helper).subscribe();
  }
  getRoomReviewed(id:number):Observable<UserRoomsHelpers[]>{
   return  this.httpclient.get<UserRoomsHelpers[]>(`${this.baseURL}/reviewed/${id}`);
  }
}
