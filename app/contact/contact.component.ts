import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, Tooltip, InputText, Button, Header, Panel, Messages, Dropdown, Footer, Dialog, SelectItem, MultiSelect} from 'primeng/primeng';
import { Message } from "../message";
import { Group } from "../group/group";
import { GroupService } from "../group/group.service";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, Tooltip, InputText, Button, Header, Panel, Messages, Dropdown, Footer, Dialog, MultiSelect]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    errorMessage: string;
    contacts: Contact[];
    contactSelected: Contact;
    contact: Contact;

    displayDialog: boolean;
    readonlyDialog: boolean;
    updateContact: boolean;
    createContact: boolean;
    groupItems: SelectItem[];

    constructor(private contactService: ContactService, private groupService: GroupService) { }

    ngOnInit() {
        this.getAllContacts();
        this.getAllGroups();
    }

    getAllContacts() {
        this.contactService.getAllContacts()
            .subscribe(
            contacts => {
                this.contacts = contacts
            },
            error => this.errorMessage = <any>error
            );
    }

    getAllGroups() {
        this.groupService.getAllGroups()
            .subscribe(
            groups => {
                this.groupItems = [];
                for (let groupItem of groups) {
                    this.groupItems.push({ label: groupItem.name, value: groupItem });
                }
            },
            error => this.errorMessage = <any>error
            );
    }

    createContactClick() {
        this.contact = new Contact();
        this.displayDialog = true;
        this.readonlyDialog = false;
        this.createContact = true;
    }

    createContactSubmit() {
        this.msgs = [];
        this.contactService.createContact(this.contact)
            .subscribe(() => {
                this.getAllContacts();
                this.displayDialog = false;
                this.readonlyDialog = true;
                this.createContact = false;
                this.msgs.push({ severity: "info", summary: "Contact created successfully.", detail: "" });
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact creation failed.", detail: "" })
            });
    }

    onRowSelect(event) {
        this.contactSelected = new Contact();
        this.contactSelected = this.cloneContact(event.data);
        this.contact = this.cloneContact(this.contactSelected);
        this.displayDialog = true;
        this.readonlyDialog = true;
        this.updateContact = false;
        this.createContact = false;
    }

    updateContactClick() {
        this.contact = this.cloneContact(this.contactSelected);
        this.readonlyDialog = false;
        this.updateContact = true;
    }

    updateDialogCancelClick() {
        this.contact = this.cloneContact(this.contactSelected);
        this.readonlyDialog = true;
        this.updateContact = false;
    }

    updateContactSubmit() {
        this.msgs = [];
        this.contactService.updateContact(this.contact)
            .subscribe(() => {
                this.getAllContacts();
                this.displayDialog = false;
                this.readonlyDialog = true;
                this.updateContact = false;
                this.msgs.push({ severity: "info", summary: "Contact updated successfully.", detail: "" });
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact updation failed.", detail: "" })
            });
    }

    deleteSelectedContact() {
        this.msgs = [];
        this.contactService.deleteContact(this.contactSelected.id)
            .subscribe(() => {
                this.getAllContacts();
                this.msgs.push({ severity: "info", summary: "Contact deleted successfully.", detail: "" });
                this.displayDialog = false;
            },
            error => {
                this.errorMessage = <any>error
                this.msgs.push({ severity: "error", summary: "Contact deletion failed.", detail: "" })
            });
    }

    createDialogCancelClick() {
        this.displayDialog = false;
        this.readonlyDialog = true;
        this.createContact = false;
    }

    cloneContact(cont: Contact): Contact {
        let contact = new Contact();
        for (let prop in cont) {
            contact[prop] = cont[prop];
        }
        return contact;
    }

    cloneGroup(group: Group): Group {
        let groupNew = new Group();
        for (let prop in group) {
            groupNew[prop] = group[prop];
        }
        return groupNew;
    }

}