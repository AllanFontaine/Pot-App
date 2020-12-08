import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable()
export class PersonalGardenService {
  private url_plant = 'http://51.68.225.45/api';
  private url_parcel: 'http://51.68.225.45/api/parcelle';

  constructor(private http: HttpClient) { }


  get_plants(): Observable<any> {
    this.http.get('http://fr.wikipedia.org/w/api.php?action=opensearch&search=Tomate')
    return this.http.get(this.url_plant + '/plante/');
  }

  get_plants_conseil(month, day, donnee): Observable<any> {
    if(donnee == '')
      return this.http.get(this.url_plant + '/plante/?month='+month+'&day='+day);
    else
      return this.http.get(this.url_plant + '/plante/?month='+month+'&day='+day+'&comp='+donnee);
  }

  get_wiki(): Observable<any> {
    return this.http.get('http://fr.wikipedia.org/w/api.php?action=opensearch&search=Tomate')
  }

  get_my_active_parcels(): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/?stat=True'
    );
  }

  get_my_parcels(): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/'
    );
  }
  get_my_parcels_ordered(orderBy, orderWay): Observable<any> {
    return this.http.get(
      this.url_plant + '/parcelle-plantes/?'+ orderBy + "=" + orderWay
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

  get_profile(): Observable<any> {
    return this.http.get(
      this.url_plant + '/profile/'
    );
  }


  modify_profile(data): Observable<any> {
    return this.http.put(
      this.url_plant + '/profile/' , data
    )
  }
  add_parcel(parcel): Observable<any> {
    return this.http.post(this.url_plant + '/parcelle/', parcel);
  }

  get_parcel_data(parcel, date): Observable<any> {
    return this.http.get(this.url_plant + '/donnees-parcelle/?idParcelle=' + parcel + '&date=' + date);
  }
  get_user_data(date): Observable<any> {
    return this.http.get(this.url_plant + '/donnees-user/?date=' + date);
  }
  get_last_parcel(parcel, date){
    return this.http.get(this.url_plant + '/parcelle-plantes/?numparcel='+parcel+'&date='+date)
  }
}


