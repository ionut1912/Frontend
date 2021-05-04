import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TotalPrice} from "../clases/TotalPrice";


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseURL = "http://localhost:8081/prices";

  constructor(private httpclient: HttpClient) {
  }

  getTotalPrice(checkin:Date,checkout:Date,id: number): Observable<TotalPrice> {

    return this.httpclient.get<TotalPrice>(`${this.baseURL}/${checkin}/${checkout}/${id}`);
  }

}
