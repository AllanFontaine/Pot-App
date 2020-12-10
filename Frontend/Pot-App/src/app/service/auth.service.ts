import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  helper = new JwtHelperService();

  private token;


  constructor(private http: HttpClient, private router: Router) { }

  login(data): Observable<any> {
    console.log(data);
    return this.http.post('https://api.pot-app.be/api/token', data)
  }

  registerUser(user): Observable<any> {
    return this.http.post('https://api.pot-app.be/api/register', user)
  }

  postProfil(user): Observable<any> {
    return this.http.post("https://api.pot-app.be/api/profile/", user)
  }

  LoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    localStorage.removeItem('user_id')
    this.router.navigate(['/home'])
  }

  get_User(): Observable<any> {
    return this.http.get('https://api.pot-app.be/api/users/')
  }

  get_Profile(): Observable<any> {
    return this.http.get('https://api.pot-app.be/api/profile/')
  }

  modify_User(user_id, data): Observable<any>{
    this.token = this.helper.decodeToken(user_id);
    return this.http.put('https://api.pot-app.be/api/users/'+ this.token.id +'/', data);
  }
}
