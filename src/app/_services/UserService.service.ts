import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../clases/UserData";
import {Users} from "../clases/Users";

@Injectable({
  providedIn: 'root'
})
export  class UserService {
  private baseURL = "http://localhost:8081/user";
  constructor(private httpClient:HttpClient){

  }
getUserData(username:string):Observable<UserData>
{
  return  this.httpClient.get<UserData>(`${this.baseURL}/user1/${username}`);
}
updateUserDetails(id:number, user:UserData):Observable<UserData>{
    return  this.httpClient.patch<UserData>(`${this.baseURL}/${id}`,user);
}

  setHotelReview(id: number, user: Users):Observable<Users>{
    return  this.httpClient.patch<Users>(`${this.baseURL}/updatehotelreview/${id}`,user)
}

}
