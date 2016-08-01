import { Component, OnInit } from "@angular/core";
import { ContactGroupService } from "./contactgroup.service";
import { ContactGroup } from "./contactgroup";

@Component({
    templateUrl: "app/contactgroup/contactgroup.component.html"
})
export class ContactGroupComponent implements OnInit {

    contactGroups: ContactGroup[];
    errorMessage: string;

    constructor(private contactGroupService: ContactGroupService) { }

    ngOnInit() {
        this.getAllContactGroups();
    }

    getAllContactGroups() {
        this.contactGroupService.getAllContactGroups()
            .subscribe(
            contactGroups => this.contactGroups = contactGroups,
            error => this.errorMessage = <any>error
            );
    }

}