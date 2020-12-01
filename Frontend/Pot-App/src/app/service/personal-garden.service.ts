import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable()
export class PersonalGardenService {
  private url_plant = 'http://127.0.0.1:8000/api';
  private url_parcel: 'http://127.0.0.1:8000/api/parcelle';

  constructor(private http: HttpClient) { }


  get_plants(): Observable<any> {
    this.http.get('http://fr.wikipedia.org/w/api.php?action=opensearch&search=Tomate')
    return this.http.get(this.url_plant + '/plante/');
  }

  get_wiki(): Observable<any> {
    return this.http.get('http://fr.wikipedia.org/w/api.php?action=opensearch&search=Tomate')
  }

  get_my_active_parcels(user_id): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/?userid=' +
      user_id +
      '&stat=True'
    );
  }

  get_my_parcels(): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/?userid=' + this.get_user_id()
    );
  }
  get_my_parcels_ordered(orderBy, orderWay): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/?userid=' + this.get_user_id() + "&" + orderBy + "=" + orderWay
    );
  }

  get_one_parcel(id): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/' + id + '/'
    );
  }

  delete_parcel(user_id, data): Observable<any> {
    return this.http.put(
      this.url_plant + '/parcelle/' + user_id + '/',
      data
    );
  }
  erase_parcel(parcel_id): Observable<any> {
    console.log(this.url_plant + '/parcelle/' + parcel_id + '/')
    return this.http.delete(this.url_plant + '/parcelle/' + parcel_id + '/');
  }
  get_user_id() {
    return localStorage.getItem('user_id');
  }
  get_profile(): Observable<any> {
    return this.http.get(
      this.url_plant + '/profile/' + this.get_user_id() + '/'
    );
  }


  modify_profile(data): Observable<any> {
    return this.http.put(
      this.url_plant + '/profile/' + this.get_user_id() + '/', data
    )
  }
  add_parcel(parcel): Observable<any> {
    return this.http.post(this.url_plant + '/parcelle/', parcel);
  }

  get_parcel_data(parcel, date): Observable<any> {
    return this.http.get(this.url_plant + '/donnees-parcelle/?idParcelle=' + parcel + '&date=' + date);
  }
  get_user_data(date): Observable<any> {
    return this.http.get(this.url_plant + '/donnees-user/?idParcelle=' + this.get_user_id() + '&date=' + date);
  }
}


