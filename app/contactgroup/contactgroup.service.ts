import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { ContactGroup } from "./contactgroup";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactGroupService {

    private contactgroupUrl = "http://localhost:8080/contactgroups";

    constructor(private http: Http) { }

    getAllContactGroups(): Observable<ContactGroup[]> {
        return this.http.get(this.contactgroupUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateContactGroup(contactGroup: ContactGroup) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.contactgroupUrl, JSON.stringify(contactGroup), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    deleteContactGroup(contactGroup: ContactGroup): Observable<void> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.contactgroupUrl + "/" + contactGroup.contact.id + "/" + contactGroup.group.id, { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}