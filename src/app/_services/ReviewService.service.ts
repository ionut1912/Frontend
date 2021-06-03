import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ReviewDetails} from "../clases/ReviewDetails";
import {ReviewHelper} from '../clases/ReviewHelper';




@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  private baseURL = "http://localhost:8081/reviews";

  constructor(private httpclient: HttpClient) {
  }

  getReviews(id: number): Observable<ReviewDetails> {
    return this.httpclient.get<ReviewDetails>(`${this.baseURL}/${id}`);
  }
  saveReview(helper:ReviewHelper):void{
    this.httpclient.post<ReviewHelper>(`${this.baseURL}`,helper).subscribe();
  }
}
