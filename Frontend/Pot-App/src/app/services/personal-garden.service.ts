import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class PersonalGardenService{

  constructor(private http: HttpClient){}

  get_my_garden():Observable<any>{
    return this.http.get("http://127.0.0.1:8000/api")
  }

}
