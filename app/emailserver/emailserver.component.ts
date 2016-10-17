import { Component, OnInit} from "@angular/core";
import { Growl, DataTable, Column, Button, Header, Footer, Dropdown, SelectItem, Listbox } from "primeng/primeng";
import { Message } from "../message";
import { EmailServer } from "./emailserver";
import { EmailServerService } from "./emailserver.service";
import { EmailServerProperty } from "./emailserver.properties";

@Component({
    selector: "my-servers",
    templateUrl: "app/emailserver/emailserver.component.html",
    directives: [Growl, DataTable, Column, Button, Header, Footer, Dropdown, Listbox]
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
    emailServerPropertyTypes: SelectItem[];
     emailServerPropertyNew:  EmailServerProperty;

    constructor(private emailServerService: EmailServerService) { }

    ngOnInit() {
        this.getAllEmailServers();
        this.loadEmailServerPropertyType();
    }

    loadEmailServerPropertyType(){
        this.emailServerPropertyTypes = [];
        this.emailServerPropertyTypes.push({label:'String', value:EmailServerPropertyType.string});
        this.emailServerPropertyTypes.push({label:'Number', value:EmailServerPropertyType.number});
        this.emailServerPropertyTypes.push({label:'Boolean', value:EmailServerPropertyType.boolean});
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

    updateEmailServerSubmit(){
        this.emailServerService.updateEmailServerSubmit(this.emailServerSelected)
            .subscribe(emailServerUpdated => {
                this.emailServerSelected = emailServerUpdated;
                this.viewEmailServer = true;
                this.updateEmailServer = false;
                this.msgs.push({ severity: "info", summary: "Email Server updated successfully.", detail: "" });
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email Server updation failed.", detail: error })
            });
    }

    createEmailServerClick() {
        this.emailServerNew = new EmailServer();
        this.emailServerPropertyNew = new EmailServerProperty();
        this.createEmailServer = true;
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    addEmailServerPropertyClick(){
        
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

    updateEmailServerCancel() {
         this.updateEmailServer = false;
        this.viewEmailServer = true;
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