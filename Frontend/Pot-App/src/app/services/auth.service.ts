import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/token', data)
  }

  registerUser( user ):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/register', user)
  }

  isLoggedIn(){

  }

}
