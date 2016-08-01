import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ContactGroup } from "./contactgroup";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactGroupService {

    private contactGroupUrl = "http://localhost:8001/contactgroups";

    constructor(private http: Http) { }

    getAllContactGroups(): Observable<ContactGroup[]> {
        return this.http.get(this.contactGroupUrl)
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