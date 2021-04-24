import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../clases/UserData";

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
}
