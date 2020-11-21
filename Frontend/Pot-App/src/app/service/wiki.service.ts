import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WikiService{
    plants: [];
    selectedPlant; 

    constructor(private http : HttpClient) {

    }

    get_plants():Observable<any> {
        return this.http.get('http://localhost:8000/api/plante/');
    }

    get_plant(id: number):Observable<any> {
        return this.http.get('http://localhost:8000/api/plante/' + id + '/');
    }

    get_plant_wikipedia(nom: string):Observable<any> {
        return this.http.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + nom);
    }
}
