import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WikiService{
    plants: [];
    selectedPlant; 
    selectedPlantWikipedia;

    constructor(private http : HttpClient) {

    }

    get_plants():Observable<any> {
        return this.http.get('http://localhost:8000/api/plante/');
    }

    get_plant(id: number):Observable<any> {
        return this.http.get('http://localhost:8000/api/plante/' + id + '/');
    }

    get_plant_by_name(nom: string):Observable<any> {
        return this.http.get("http://localhost:8000/api/plante/?name=" + nom);
    }

    get_plant_count():Observable<any> {
        return this.http.get("http://localhost:8000/api/plante/?count")
    }

    get_plant_offset_limit(offset: number, limit: number):Observable<any> {
        return this.http.get("http://localhost:8000/api/plante/?limit=" + limit + "&offset=" + offset);
    }
}
