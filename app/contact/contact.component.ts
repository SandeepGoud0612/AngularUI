import { Component, OnInit } from "@angular/core";
import { ContactService } from "./contact.service";
import { Contact } from "./contact";
import { DataTable, Column, Tooltip, InputText, Button, Header, Panel, Messages, Dropdown, Footer, Dialog, SelectItem} from 'primeng/primeng';
import { Message } from "../message";
import { ContactGroup } from "../contactgroup/contactgroup";
import { ContactGroupService } from "../contactgroup/contactgroup.service";

@Component({
    selector: "my-contact",
    templateUrl: "app/contact/contact.component.html",
    styleUrls: ["app/contact/contact.component.css"],
    directives: [DataTable, Column, Tooltip, InputText, Button, Header, Panel, Messages, Dropdown, Footer, Dialog]
})
export class ContactComponent implements OnInit {

    msgs: Message[] = [];
    contactGroups: SelectItem[];
    contacts: Contact[];
    errorMessage: string;
    selectedContact: Contact;
    contactNew: Contact;
    displayDialog: boolean;
    readonlyDialog: boolean;
    updateContact: boolean;
    createContact: boolean;

    constructor(private contactService: ContactService, private contactGroupService: ContactGroupService) { }

    ngOnInit() {
        this.getAllContacts();
        this.getAllContactGroupNames();
    }

    getAllContacts() {
        this.contactService.getAllContacts()
            .subscribe(
            contacts => this.contacts = contacts,
            error => this.errorMessage = <any>error
            );
    }

    getAllContactGroupNames() {
        this.contactGroupService.getAllContactGroups()
            .subscribe(
            contactGroups => {
                let index: number = 0;
                this.contactGroups = [];
                for (let contactGroup of contactGroups) {
                    this.contactGroups.push({ label: contactGroup.name, value: contactGroup });
                }
            },
            error => this.errorMessage = <any>error
            );
    }

    onRowSelect(event) {
        this.contactNew = new Contact();
        this.contactNew.contactGroup = new ContactGroup();
        this.contactNew = this.cloneCar(event.data);
        this.contactNew.contactGroup = this.cloneGroup(this.contactNew.contactGroup);
        this.displayDialog = true;
        this.readonlyDialog = true;
        this.updateContact = false;
        this.createContact = false;
    }

    createContactClick() {
        this.contactNew = new Contact();
        this.contactNew.contactGroup = new ContactGroup();
        this.contactNew.contactGroup.name = "sam";
        this.displayDialog = true;
        this.readonlyDialog = false;
        this.createContact = true;
    }

    createContactSubmit() {
        this.msgs = [];
        this.contactService.createContact(this.contactNew)
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

    updateContactSubmit() {
        this.msgs = [];
        this.contactService.updateContact(this.contactNew)
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
        this.contactService.deleteContact(this.selectedContact.objectId)
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

    updateContactClick() {
        this.readonlyDialog = false;
        this.updateContact = true;
    }

    createDialogCancelClick() {
        this.displayDialog = false;
        this.readonlyDialog = true;
        this.createContact = false;
    }

    updateDialogCancelClick() {
        this.readonlyDialog = true;
        this.updateContact = false;
    }

    cloneGroup(group: ContactGroup): ContactGroup {
        let contactGroup = new ContactGroup();
        for (let prop in group) {
            contactGroup[prop] = group[prop];
        }
        return contactGroup;
    }

    cloneCar(cont: Contact): Contact {
        let contact = new Contact();
        for (let prop in cont) {
            contact[prop] = cont[prop];
        }
        return contact;
    }

}