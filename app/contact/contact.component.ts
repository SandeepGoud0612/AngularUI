import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox} from 'primeng/primeng';
import { Message } from "../message";
import { ContactGroupService } from "../contactgroup/contactgroup.service";
import { ContactGroup } from "../contactgroup/contactgroup";
import { Group } from "../group/group";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, InputText, Button, Header, Messages, Dropdown, Footer, Dialog, Checkbox]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    errorMessage: string;
    contactGroups: ContactGroup[];
    contactGroupSelected: ContactGroup;

    contacts: Contact[];
    contactSelected: Contact;
    contact: Contact;
    displayDialog: boolean;
    readonlyDialog: boolean;
    updateContact: boolean;
    createContact: boolean;


    constructor(private contactService: ContactService, private contactGroupService: ContactGroupService) { }

    ngOnInit() {
        this.getAllContactGroups();
    }

    onRowSelect(event) {
        this.displayDialog = true;
        this.readonlyDialog = true;
        this.updateContact = false;
        this.createContact = false;
        this.contactGroupSelected = event.data;

        this.contactSelected = new Contact();
        this.contactSelected = this.cloneContact(event.data);
        this.contact = this.cloneContact(this.contactSelected);
    }

    getAllContactGroups() {
        this.contactGroupService.getAllContactGroups()
            .subscribe(
            contactGroups => {
                this.contactGroups = contactGroups;
            },
            error => this.errorMessage = <any>error
            );
    }

    getAllContacts() {
        this.contactService.getAllContacts()
            .subscribe(
            contacts => {
                this.contacts = contacts;
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

    cloneGroup(gro: Group): Group {
        let group = new Group();
        for (let prop in gro) {
            group[prop] = gro[prop];
        }
        return group;
    }

    cloneContactGroup(contGrou: ContactGroup): ContactGroup {
        let contactGroup = new ContactGroup();
        for (let prop in contGrou) {
            contactGroup[prop] = contGrou[prop];
        }
        return contactGroup;
    }

}