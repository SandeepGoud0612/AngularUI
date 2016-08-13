import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable }     from "rxjs/Observable";
import { Contact } from "./contact";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

    private contactUrl = "http://localhost:8001/contacts";

    constructor(private http: Http) { }

    createContact(contact: Contact): Observable<Contact> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.contactUrl, JSON.stringify(contact), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    getAllContacts(): Observable<Contact[]> {
        return this.http.get(this.contactUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateContact(contact: Contact) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.contactUrl + "/" + contact.id, JSON.stringify(contact), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    deleteContact(objectId: number): Observable<void> {
        return this.http.delete(this.contactUrl + "/" + objectId)
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