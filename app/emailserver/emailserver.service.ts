import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { EmailServer } from "./emailserver";

@Injectable()
export class EmailServerService {

    private emailServerURL = "http://localhost:8080/emailServer";

    constructor(private http: Http) { }

    getAllEmailServers(): Observable<EmailServer[]> {
        return this.http.get(this.emailServerURL)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    createEmailServer(emailServer: EmailServer): Observable<EmailServer> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.emailServerURL, JSON.stringify(emailServer), { headers: headers })
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    deleteEmailServer(objectId: number): Observable<void> {
        return this.http.delete(this.emailServerURL + "/" + objectId)
            .map((res: Response) => { return; })
            .catch(this.handleError);
    }

    updateEmailServerSubmit(emailServer: EmailServer) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.emailServerURL + "/" + emailServer.id, JSON.stringify(emailServer), { headers: headers })
            .map((res: Response) => res.json())
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