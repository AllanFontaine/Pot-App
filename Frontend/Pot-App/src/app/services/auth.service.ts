import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(data):Observable<any>{
    console.log(data);
    return this.http.post('http://127.0.0.1:8000/api/token', data)
  }

  registerUser(user):Observable<any>{
    console.log(user);
    return this.http.post('http://127.0.0.1:8000/api/users', user)
  }

  LoggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }
}
