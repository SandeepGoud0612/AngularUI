import { Component, OnInit} from "@angular/core";
import { Growl, DataTable, Column, Button, Header, Footer } from "primeng/primeng";
import { Message } from "../message";
import { EmailServer } from "./emailserver";
import { EmailServerService } from "./emailserver.service";

@Component({
    selector: "my-servers",
    templateUrl: "app/emailserver/emailserver.component.html",
    directives: [Growl, DataTable, Column, Button, Header, Footer]
})
export class EmailServerComponent implements OnInit {

    msgs: Message[] = [];
    emailServers: EmailServer[] = [];
    emailServerNew: EmailServer;
    emailServerUpdate: EmailServer;
    createEmailServer: boolean;
    active: boolean = true;
    viewEmailServer: boolean;
    updateEmailServer: boolean;
    emailServerSelected: EmailServer;

    constructor(private emailServerService: EmailServerService) { }

    ngOnInit() {
        this.getAllEmailServers();
    }

    onRowSelect(event: any) {
        this.emailServerSelected = event.data;
        this.viewEmailServer = true;
    }

    getAllEmailServers() {
        this.emailServerService.getAllEmailServers()
            .subscribe(
            emailServers => {
                this.emailServers = emailServers;
            }
            );
    }

    createEmailServerClick() {
        this.emailServerNew = new EmailServer();
        this.createEmailServer = true;
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    createEmailServerCancleClick() {
        this.createEmailServer = false;
        this.updateEmailServer = false;
    }

    viewEmailServerCancleClick() {
        this.viewEmailServer = false;
        this.updateEmailServer = false;
    }

    updateEmailServerClick() {
        this.updateEmailServer = true;
        this.viewEmailServer = true;
        this.emailServerUpdate = this.emailServerSelected;
        this.emailServerSelected = this.cloneContact(this.emailServerUpdate);
    }

    cloneContact(server: EmailServer): EmailServer {
        let emailServer = new EmailServer();
        for (let prop in server) {
            emailServer[prop] = server[prop];
        }
        return emailServer;
    }

    deleteEmailServerCancleClick() {
        this.msgs = [];
        this.emailServerService.deleteEmailServer(this.emailServerSelected.id)
            .subscribe(() => {
                this.msgs.push({ severity: "info", summary: "Email Server deleted successfully.", detail: "" });
                this.viewEmailServer = false;
                this.getAllEmailServers();
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server deletion failed.", detail: error });
            });
    }

}