import { UserdataComponent } from './../userdata/userdata.component';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../clases/UserData";
import {Users} from "../clases/Users";
import {HotelReviewHelper} from '../clases/HotelReviewHelper';
import {UserRoomsHelpers} from "../clases/UserRoomsHelpers";
import {NrOfUsersHelper} from "../clases/NrOfUsersHelper";
import {UserByType} from "../clases/UserByType";
import {NrOfUserReservations} from "../clases/NrOfUserReservations";
import { UserCode } from "../clases/UserCode";
import { FindCodeHelper } from '../clases/FindCodeHelper';

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
  return  this.httpClient.get<HotelReviewHelper[]>(`${this.baseURL}/hotelreview`);
}
getUserRooms(id:number):Observable<UserRoomsHelpers[]>
{
  return this.httpClient.get<UserRoomsHelpers[]>(`${this.baseURL}/rooms/${id}`);
}
getNrOfUsers():Observable<NrOfUsersHelper>
{
  return  this.httpClient.get<NrOfUsersHelper>(`${this.baseURL}/nrofusers`)
}
getNrOfUsersByType():Observable<UserByType[]>
{
    return this.httpClient.get<UserByType[]>(`${this.baseURL}/usersbytype`);
}
getUserReservations():Observable<NrOfUserReservations[]>{
    return  this.httpClient.get<NrOfUserReservations[]>(`${this.baseURL}/userreservations`);
}
getIdByEmail(email:string):Observable<UserCode>{
return this.httpClient.get<UserCode>(`${this.baseURL}/emails/${email}`);
}
sentCode(id:number,userData:UserData):Observable<UserData>{
  return this.httpClient.patch<UserData>(`${this.baseURL}/usercode/${id}`,userData);
}
getCode(id:number):Observable<FindCodeHelper>{
  return this.httpClient.get<FindCodeHelper>(`${this.baseURL}/usercode/${id}`);
}
}
