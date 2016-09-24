import { Component, OnInit} from "@angular/core";
import { Growl } from "primeng/primeng";
import { Message } from "../message";
import { EmailServer } from "./emailserver";
import { EmailServerService } from "./emailserver.service";

@Component({
    selector: "my-servers",
    templateUrl: "app/emailserver/emailserver.component.html",
    directives: [Growl]
})
export class EmailServerComponent implements OnInit {

    msgs: Message[] = [];
    emailServers: EmailServer[] = [];
    emailServerService: EmailServerService;

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

}