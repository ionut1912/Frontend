import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../clases/UserData";
import {Users} from "../clases/Users";
import {HotelReviewHelper} from '../clases/HotelReviewHelper';

@Injectable({
  providedIn: 'root'
})
export  class UserService {
  private baseURL = "http://localhost:8081/user";
  constructor(private httpClient:HttpClient){

  }
getUserData(username:string):Observable<Users>
{
  return  this.httpClient.get<Users>(`${this.baseURL}/user1/${username}`);
}
updateUserDetails(id:number, user:Users):Observable<Users>{
    return  this.httpClient.patch<Users>(`${this.baseURL}/${id}`,user);
}
  updateUserDetailswithoutType(id:number, user:Users):Observable<Users>{
    return  this.httpClient.patch<Users>(`${this.baseURL}/${id}/type`,user);
  }
  setHotelReview(id: number, user: Users):Observable<Users>{
    return  this.httpClient.patch<Users>(`${this.baseURL}/updatehotelreview/${id}`,user)
}
getAllUsers():Observable<Users[]>{
    return  this.httpClient.get<Users[]>(`${this.baseURL}`);
}
saveUser(user:Users):Observable<Users>{
    return  this.httpClient.post<Users>(`${this.baseURL}`,user);
}
deleteUsers(id:number):void {
    this.httpClient.delete<Users>(`${this.baseURL}/${id}`).subscribe();
}
getHotelReviews():Observable<HotelReviewHelper[]>
{
  return  this.httpClient.get<HotelReviewHelper[]>(`${this.baseURL}/hotelreview`)
}
}
