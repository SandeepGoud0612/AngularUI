import { Component, OnInit } from "@angular/core";
import { Growl, SelectItem } from 'primeng/primeng';
import { Email } from "./email";
import { Group } from "../group/group";
import { CommonService } from "../shared/common.service";
import { EmailService } from "./email.service";
import { Message } from "../message";

@Component({
    selector: "my-email",
    templateUrl: "app/email/email.component.html",
    directives: [Growl]
})
export class EmailComponent {
    emailVO = new Email();
    active: boolean = true;
    selectedGroups: Group[] = [];
    msgs: Message[] = [];

    constructor(private emailService: EmailService, private commonService: CommonService) { }

    ngOnInit() {
        this.commonService.getAllGroups();
    }

    sendEmail() {
        this.emailVO.groupIdList = []
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
            },
            error => {
                this.msgs.push({ severity: "error", summary: "Email sending failed.", detail: error })
            });
    }

    cancelClick() {
        this.emailVO = new Email();
    }
}