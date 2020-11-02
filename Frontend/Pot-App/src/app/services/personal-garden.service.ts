import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class PersonalGardenService{
  private url_plant: "http://127.0.0.1:8000/api/";
  private url_parcel: "http://127.0.0.1:8000/api/parcelle";


  constructor(private http: HttpClient){}

  get_plants():Observable<any>{
    return this.http.get("http://127.0.0.1:8000/api/")
  }

  get_parcel():Observable<any>{
    return this.http.get("http://127.0.0.1:8000/api/parcelle/")
  }

  get_user_id(){
    return localStorage.getItem('user_id');
  }

  add_parcel(parcel):Observable<any>{
    return this.http.post("http://127.0.0.1:8000/api/parcelle/", parcel)
  }

}
