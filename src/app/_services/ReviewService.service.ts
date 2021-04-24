import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ReviewDetails} from "../clases/ReviewDetails";




@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  private baseURL = "http://localhost:8081/reviews";

  constructor(private httpclient: HttpClient) {
  }

  getReviews(id: number): Observable<ReviewDetails[]> {
    return this.httpclient.get<ReviewDetails[]>(`${this.baseURL}/${id}`);
  }
}
