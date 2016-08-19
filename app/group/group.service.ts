import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Group } from "./group";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {

    private groupUrl = "http://localhost:8001/groups";

    constructor(private http: Http) { }

    getAllGroups(): Observable<Group[]> {
        return this.http.get(this.groupUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}