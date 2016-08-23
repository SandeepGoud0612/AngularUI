import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox, SelectItem, MultiSelect, Panel} from 'primeng/primeng';
import { Message } from "../message";
import { ContactGroupService } from "../contactgroup/contactgroup.service";
import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";
import { GroupService } from "../group/group.service";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox, MultiSelect, Panel]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    errorMessage: string;
    contacts: Contact[];
    displayViewDialog: boolean;
    contactSelected: Contact;
    updateContact: boolean;

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.getAllContacts();
    }

    getAllContacts() {
        this.contactService.getAllContacts()
            .subscribe(
            contacts => {
                this.contacts = contacts;
                for (let contact of this.contacts) {
                    for (let contactGroup of contact.contactGroups) {
                        if (contact.groupDetails === undefined) {
                            contact.groupDetails = contactGroup.group.name;
                        } else {
                            contact.groupDetails += ", " + contactGroup.group.name;
                        }
                    }
                }
            },
            error => this.errorMessage = <any>error
            );
    }

    onRowSelect(event) {
        this.displayViewDialog = true;
        this.contactSelected = event.data;
        this.updateContact = true;
    }

    deleteSelectedContact(){
        this.msgs = [];
        this.contactService.deleteContact(this.contactSelected.id)
            .subscribe(() => {
                this.getAllContacts();
                this.msgs.push({ severity: "info", summary: "Contact deleted successfully.", detail: "" });
                this.displayViewDialog = false;
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact deletion failed.", detail: "" })
            });
    }

}