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

    constructor(private http: HttpClient) {

    }

    get_plants(): Observable<any> {
        return this.http.get('http://localhost:8000/api/plante/');
    }

    get_plant(id: number): Observable<any> {
        return this.http.get('http://localhost:8000/api/plante/' + id + '/');
    }

    get_plant_by_name(nom: string, order: string, tri: string): Observable<any> {
        return this.http.get("http://localhost:8000/api/plante/?name=" + nom + '&order=' + order + "tri=" + tri);
    }

    get_plant_count(): Observable<any> {
        return this.http.get("http://localhost:8000/api/plante/?count")
    }

    get_plant_offset_limit(offset: number, limit: number, order: string, tri: string): Observable<any> {
        return this.http.get("http://localhost:8000/api/plante/?limit=" + limit + "&offset=" + offset + "&order=" + order + "&tri=" + tri);
    }
}
