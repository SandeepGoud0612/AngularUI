import { Component, OnInit } from "@angular/core";
import { Growl, SelectItem, Dialog, ProgressBar } from 'primeng/primeng';
import { Email } from "./email";
import { Group } from "../group/group";
import { CommonService } from "../shared/common.service";
import { EmailService } from "./email.service";
import { Message } from "../message";

@Component({
    selector: "my-email",
    templateUrl: "app/email/email.component.html",
    directives: [Growl, Dialog, ProgressBar]
})
export class EmailComponent {
    emailVO = new Email();
    active: boolean = true;
    selectedGroups: Group[] = [];
    msgs: Message[] = [];
    emailSending: boolean = false;

    constructor(private emailService: EmailService, private commonService: CommonService) { }

    ngOnInit() {
        this.commonService.getAllGroups();
    }

    sendEmail() {
        this.emailVO.groupIdList = [];
        for (let group of this.selectedGroups) {
            this.emailVO.groupIdList.push(group.id);
        }
        this.emailService.sendEmail(this.emailVO)
            .subscribe(() => {
                this.emailVO = new Email();
                this.selectedGroups = [];
                this.active = false;
                setTimeout(() => this.active = true, 0);
                this.msgs.push({ severity: "info", summary: "Email sent successfully.", detail: "" });
                this.emailSending = false;
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email sending failed.", detail: error });
                this.emailSending = false;
            });
    }


    showDialog() {
        this.emailSending = true;
    }

    cancelClick() {
        this.emailVO = new Email();
    }
}