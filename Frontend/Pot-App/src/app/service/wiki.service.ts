import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WikiService {
    plants: [];
    selectedPlant;
    selectedPlantWikipedia;
    offset = 0;
    limit = 10;
    filter = "";
    length;
    pageIndex = 0;
    urlApi = 'http://51.68.225.45:81/api/'
    constructor(private http : HttpClient) {

    }

    get_plants():Observable<any> {
        return this.http.get(this.urlApi + 'plante/');
    }

    get_plant(id: number):Observable<any> {
        return this.http.get(this.urlApi + 'plante/' + id + '/');
    }

    get_plant_by_name(nom: string, order: string, tri: string):Observable<any> {
        return this.http.get(this.urlApi + "plante/?name=" + nom + '&order=' + order + "tri=" + tri);
    }

    get_plant_count():Observable<any> {
        return this.http.get(this.urlApi + "plante/?count")
    }

    get_plant_offset_limit(offset: number, limit: number, order: string, tri: string):Observable<any> {
        return this.http.get(this.urlApi + "plante/?limit=" + limit + "&offset=" + offset + "&order=" + order + "&tri=" + tri);

    }
}
