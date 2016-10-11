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
    createEmailServer: boolean;
    active: boolean = true;

    constructor(private emailServerService: EmailServerService){}

    ngOnInit() {
        this.getAllEmailServers();
    }

    getAllEmailServers() {
        this.emailServerService.getAllEmailServers()
            .subscribe(
            emailServers => {
                this.emailServers = emailServers;
            }
            );
    }

    createEmailServerClick(){
        this.emailServerNew = new EmailServer();
        this.createEmailServer = true;
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    createEmailServerCancleClick(){
         this.createEmailServer = false;
    }

}