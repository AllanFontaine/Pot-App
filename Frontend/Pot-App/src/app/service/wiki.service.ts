import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WikiService{
    plants: [];

    constructor(private hhtp : HttpClient) {

    }

    get_plants():Observable<any> {
        return this.hhtp.get('http://localhost:8000/api/plante/');
    }
}
